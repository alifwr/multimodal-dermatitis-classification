export default defineOAuthGoogleEventHandler({
    // config: {
    //     emailRequired: true,
    // },
    async onSuccess(event, { user }) {
        await setUserSession(event, {
            user: {
                id: user.sub,
                email: user.email,
                name: user.name,
                picture: user.picture,
                given_name: user.given_name,
                family_name: user.family_name,
                locale: user.locale,
                email_verified: user.email_verified
            }
        })
        return sendRedirect(event, '/predict')
    },
    onError(event, error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/login?error=oauth')
    },
})