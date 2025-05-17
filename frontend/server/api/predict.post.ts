// server/api/proxy.post.ts
export default defineEventHandler(async (event) => {
    // Read the body from the incoming request
    const body = await readBody(event);
    const runtimeConfig = useRuntimeConfig();
    console.log(body);
    console.log(runtimeConfig.public.backendUrl);
    console.log(runtimeConfig.backendUrl);

    // Forward the request to the external API
    const response = await fetch(`${runtimeConfig.public.backendUrl}/predict`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers required by the external API
        },
    });
    console.log(response);
    const data = await response.json();

    // Return the response from the external API to the client
    return data;
});