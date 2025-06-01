export default defineEventHandler(async (event) => {
    // Require user session - throws 401 if not authenticated
    const session = await requireUserSession(event)

    return {
        message: 'This is protected data!',
        user: session.user,
        timestamp: new Date().toISOString(),
        sessionAge: Date.now() - session.loggedInAt
    }
})