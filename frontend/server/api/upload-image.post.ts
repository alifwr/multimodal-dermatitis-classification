// server/api/proxy-image.post.ts
import formidable from 'formidable'
import FormData from 'form-data'
import fs from 'fs/promises'

export default defineEventHandler(async (event) => {
    try {
        const runtimeConfig = useRuntimeConfig();
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

        // Add files
        for (const [fieldName, fileArray] of Object.entries(files)) {
            const fileList = Array.isArray(fileArray) ? fileArray : [fileArray]

            for (const file of fileList) {
                if (file && file.filepath) {
                    console.log(`Processing file: ${file.originalFilename}, size: ${file.size}`)

                    const fileBuffer = await fs.readFile(file.filepath)
                    formData.append(fieldName, fileBuffer, {
                        filename: file.originalFilename || 'file',
                        contentType: file.mimetype || 'application/octet-stream'
                    })

                    // Clean up temporary file
                    try {
                        await fs.unlink(file.filepath)
                    } catch (unlinkError) {
                        console.warn('Failed to clean up temp file:', unlinkError)
                    }
                }
            }
        }

        // Configuration - replace with your target service URL
        const TARGET_SERVICE_URL = `${runtimeConfig.backendUrl}/upload-image`;//"https://dermatutus.alif.top/upload-image";//process.env.TARGET_SERVICE_URL || 'https://api.example.com/upload'

        console.log(`Forwarding request to: ${TARGET_SERVICE_URL}`)
        console.log(formData.getHeaders());

        // Forward the request to target service
        const response = await $fetch.raw(TARGET_SERVICE_URL, {
            method: 'POST',
            headers: {
                ...formData.getHeaders(),
            },
            body: formData,
            redirect: "follow"
        })

        console.log(`Target service responded with status: ${response.status}`)

        // Forward the response status
        setResponseStatus(event, response.status || 200)

        // Forward relevant response headers
        const responseHeaders = response.headers
        if (responseHeaders) {
            Object.entries(responseHeaders).forEach(([key, value]) => {
                // Forward safe headers (avoid forwarding hop-by-hop headers)
                if (!['connection', 'keep-alive', 'transfer-encoding'].includes(key.toLowerCase())) {
                    setHeader(event, key, value as string)
                }
            })
        }

        // Return the response from the target service
        return response._data

    } catch (error: any) {
        console.error('Error in image proxy:', error)

        // Handle fetch errors (network, timeout, etc.)
        if (error.response) {
            // The target service responded with an error
            setResponseStatus(event, error.response.status || 500)
            return {
                error: 'Target service error',
                message: error.response._data?.message || error.message,
                status: error.response.status
            }
        }

        // Handle other errors (network issues, parsing errors, etc.)
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal server error',
            data: {
                message: error.message
            }
        })
    }
})