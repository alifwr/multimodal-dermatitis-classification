<template>
  <div class="auth-container">
    <AuthState v-slot="{ loggedIn, user, clear }">
      <!-- Logged in state -->
      <div v-if="loggedIn" class="user-section">
        <div class="user-info">
          <img
              v-if="user?.avatar"
              :src="user.avatar"
              :alt="user.name || 'User'"
              class="user-avatar"
          >
          <div class="user-details">
            <h3>Welcome back, {{ user?.name }}!</h3>
            <p class="user-email">{{ user?.email }}</p>
            <p class="login-time">Logged in {{ formatTime(user?.loggedInAt) }}</p>
          </div>
        </div>
        <button @click="clear" class="logout-btn">
          Sign Out
        </button>
      </div>

      <!-- Not logged in state -->
      <div v-else class="login-section">
<!--        <h2>Welcome! Please sign in</h2>-->
<!--        <button @click="login" class="google-login-btn">-->
<!--          <svg width="20" height="20" viewBox="0 0 24 24">-->
<!--            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>-->
<!--            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>-->
<!--            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>-->
<!--            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>-->
<!--          </svg>-->
<!--          Sign in with Google-->
<!--        </button>-->

        <!-- Alternative: Login with popup -->
        <button @click="loginWithPopup" class="google-login-popup">
          Login dengan Google
        </button>
      </div>

      <!-- Placeholder shown during SSR/loading -->
<!--      <template v-slot="placeholder">-->
<!--        <div class="loading-state">-->
<!--          <div class="skeleton-btn"></div>-->
<!--        </div>-->
<!--      </template>-->
    </AuthState>
  </div>
</template>

<script setup>
const { openInPopup } = useUserSession()

const login = () => {
  return navigateTo('/auth/google')
}

const loginWithPopup = () => {
  openInPopup('/auth/google')
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      .format(Math.round((timestamp - Date.now()) / (1000 * 60 * 60 * 24)), 'day')
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fefefe;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.login-section h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1f2937;
}

.google-login-btn, .google-login-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.google-login-btn:hover, .google-login-popup:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px -2px rgb(0 0 0 / 0.1);
}

.google-login-popup {
  background: #f8fafc;
  color: #475569;
  font-size: 0.9rem;
}

.user-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
}

.user-details h3 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.user-email {
  margin: 0 0 0.25rem 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.login-time {
  margin: 0;
  color: #9ca3af;
  font-size: 0.8rem;
}

.logout-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px -2px rgb(239 68 68 / 0.3);
}

.loading-state {
  text-align: center;
}

.skeleton-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>