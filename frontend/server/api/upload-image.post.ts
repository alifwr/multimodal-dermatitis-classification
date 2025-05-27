// server/api/proxy-image.post.ts
import formidable from 'formidable'
import FormData from 'form-data'
import fs from 'fs/promises'
import { createReadStream } from 'fs'
import fetch from 'node-fetch'
import {readFile} from "fs/promises";

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
        // Object.entries(fields).forEach(([key, value]) => {
        //     if (Array.isArray(value)) {
        //         value.forEach(v => formData.append(key, String(v)))
        //     } else if (value) {
        //         formData.append(key, String(value))
        //     }
        // })

        // Store file paths for cleanup
        const tempFilePaths: string[] = []

        // Add files using streams - but handle single file case properly
        for (const [fieldName, fileArray] of Object.entries(files)) {
            const fileList = Array.isArray(fileArray) ? fileArray : [fileArray]

            for (const file of fileList) {
                if (file && file.filepath) {
                    console.log(`Processing file: ${file.originalFilename}, size: ${file.size}`)
                    tempFilePaths.push(file.filepath)

                    try {
                        // Create file stream
                        const fileStream = await createReadStream(file.filepath)
                        const fileBuffer = await readFile(file.filepath);

                        // Append the file to the FormData
                        formData.append('file', fileStream, {
                            filename: 'gps.jpg',
                            contentType: 'image/jpeg',
                        });

                        // Use 'file' as the field name for FastAPI compatibility
                        // formData.append('file', fileStream, {
                        //     filename: file.originalFilename || 'upload.jpg',
                        //     contentType: file.mimetype || 'image/jpeg'
                        // })

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

        try {
            // Use node-fetch with proper stream handling
            const response = await fetch(TARGET_SERVICE_URL, {
                method: 'POST',
                body: formData,
                // Let form-data set the headers automatically with boundary
                headers: {
                    accept: 'application/json',
                    // "Content-Type": "multipart/form-data",
                    ...formData.getHeaders()
                }
            })

            console.log(`Target service responded with status: ${response.status}`)

            // Get response data first (before cleanup in case of errors)
            let responseData
            const contentType = response.headers.get('content-type')

            try {
                if (contentType && contentType.includes('application/json')) {
                    responseData = await response.json()
                } else {
                    responseData = await response.text()
                }
            } catch (parseError) {
                console.log('Failed to parse response, using empty object')
                responseData = { error: 'Failed to parse response' }
            }

            // Log the response for debugging
            console.log('Response from target service:', responseData)

            // Clean up temporary files after getting response
            await cleanupTempFiles(tempFilePaths)

            // Forward the response status (including error statuses)
            setResponseStatus(event, response.status)

            // Forward response headers (excluding problematic ones)
            response.headers.forEach((value, key) => {
                const excludeHeaders = ['connection', 'keep-alive', 'transfer-encoding', 'content-encoding', 'content-length']
                if (!excludeHeaders.includes(key.toLowerCase())) {
                    setHeader(event, key, value)
                }
            })

            // Return response data (including error responses)
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