export default defineOAuthGoogleEventHandler({
    config: {
        emailRequired: true
    },
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
                googleId: user.id,
                name: user.name,
                email: user.email,
                avatar: user.picture
            },
            loggedInAt: Date.now()
        })

        return sendRedirect(event, '/')
    },
    onError(event, error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/?error=oauth_failed')
    },
})