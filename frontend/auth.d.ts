// auth.d.ts
declare module '#auth-utils' {
    interface User {
        googleId: string
        name: string
        email: string
        avatar?: string
    }

    interface UserSession {
        loggedInAt: number
    }

    interface SecureSessionData {
        // Add any server-only data here
    }
}

export {}