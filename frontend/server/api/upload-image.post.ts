// server/api/proxy-image.post.ts
import formidable from 'formidable'
import FormData from 'form-data'
import fs from 'fs/promises'
import { createReadStream } from 'fs'
import fetch from 'node-fetch'

export default defineEventHandler(async (event) => {
    try {
        // Ensure it's a POST request
        assertMethod(event, 'POST')

        // Parse multipart form data using formidable
        const form = formidable({
            maxFileSize: 10 * 1024 * 1024, // 10MB limit
            maxFiles: 5,
            keepExtensions: true,
            multiples: true
        })

        console.log('Parsing form data...')
        const [fields, files] = await form.parse(event.node.req)

        console.log('Parsed fields:', Object.keys(fields))
        console.log('Parsed files:', Object.keys(files))

        // Create new FormData for forwarding to target service
        const formData = new FormData()

        // Add text fields
        Object.entries(fields).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => formData.append(key, v))
            } else if (value) {
                formData.append(key, value)
            }
        })

        // Store file paths for cleanup
        const tempFilePaths: string[] = []

        // Add files using streams
        for (const [fieldName, fileArray] of Object.entries(files)) {
            const fileList = Array.isArray(fileArray) ? fileArray : [fileArray]

            for (const file of fileList) {
                if (file && file.filepath) {
                    console.log(`Processing file: ${file.originalFilename}, size: ${file.size}`)
                    tempFilePaths.push(file.filepath)

                    try {
                        // Use stream for better memory management
                        const fileStream = createReadStream(file.filepath)

                        formData.append(fieldName, fileStream, {
                            filename: file.originalFilename || 'upload.jpg',
                            contentType: file.mimetype || 'image/jpeg'
                        })

                        console.log(`Added file stream to FormData: ${file.originalFilename}`)

                    } catch (fileError) {
                        console.error('Error creating file stream:', fileError)
                        throw createError({
                            statusCode: 400,
                            statusMessage: `Failed to process uploaded file: ${file.originalFilename}`
                        })
                    }
                }
            }
        }

        // Get runtime config for server-side backend URL
        const config = useRuntimeConfig()
        const TARGET_SERVICE_URL = `${config.backendUrl}/upload-image`

        console.log(`Forwarding request to: ${TARGET_SERVICE_URL}`)

        // Get FormData headers
        const formHeaders = formData.getHeaders()
        console.log('Content-Type:', formHeaders['content-type'])

        try {
            // Use node-fetch with proper stream handling
            const response = await fetch(TARGET_SERVICE_URL, {
                method: 'POST',
                headers: formHeaders,
                body: formData
            })

            console.log(`Target service responded with status: ${response.status}`)

            // Clean up temporary files after request
            await cleanupTempFiles(tempFilePaths)

            // Get response data
            const responseData = await response.json().catch(async () => {
                // If JSON parsing fails, try text
                return await response.text()
            })

            // Forward the response
            setResponseStatus(event, response.status)

            // Forward response headers
            response.headers.forEach((value, key) => {
                if (!['connection', 'keep-alive', 'transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) {
                    setHeader(event, key, value)
                }
            })

            return responseData

        } catch (fetchError: any) {
            console.error('Fetch error:', fetchError)

            // Clean up temp files on error
            await cleanupTempFiles(tempFilePaths)

            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to forward request to target service',
                data: {
                    message: fetchError.message,
                    cause: fetchError.cause?.message
                }
            })
        }

    } catch (error: any) {
        console.error('Error in image proxy:', error)

        // Handle formidable parsing errors
        if (error.code === 'LIMIT_FILE_SIZE') {
            throw createError({
                statusCode: 413,
                statusMessage: 'File too large'
            })
        }

        if (error.code === 'LIMIT_FILE_COUNT') {
            throw createError({
                statusCode: 400,
                statusMessage: 'Too many files'
            })
        }

        // Handle other errors
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal server error',
            data: {
                message: error.message
            }
        })
    }
})

// Helper function to clean up temporary files
async function cleanupTempFiles(filePaths: string[]) {
    for (const filePath of filePaths) {
        try {
            await fs.unlink(filePath)
            console.log(`Cleaned up temp file: ${filePath}`)
        } catch (unlinkError) {
            console.warn(`Failed to clean up temp file ${filePath}:`, unlinkError)
        }
    }
}