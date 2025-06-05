<template>
  <div>
    <AuthState v-slot="{ loggedIn, user, clear }">
      <!-- Logged in state -->
      <div v-if="loggedIn" class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-500 hover:-translate-y-1">

        <!-- User Info Section -->
        <div class="user-info text-center">

          <!-- User Avatar -->
          <div class="mb-6">
            <img
                v-if="user?.picture"
                :src="user.picture"
                :alt="user.name || 'User'"
                class="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/30 shadow-lg shadow-blue-500/30"
            >
            <div v-else class="w-28 h-28 rounded-full mx-auto bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-white/30 shadow-lg shadow-blue-500/30 flex items-center justify-center">
              <span class="text-3xl text-white font-bold drop-shadow-lg">{{ (user?.name || 'U')[0].toUpperCase() }}</span>
            </div>
          </div>

          <!-- Welcome Card -->
          <div class="bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl px-6 py-5 mb-8 shadow-lg shadow-blue-500/10">
            <h2 class="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              Welcome, {{ user?.name }}! ✨
            </h2>
            <p class="text-blue-100 text-lg font-medium drop-shadow-md">
              Logged in {{ formatTime(user?.loggedInAt) }}
            </p>
          </div>

        </div>

        <!-- Sign Out Button -->
        <div class="rounded-2xl">
          <button
              @click="clear"
              class="w-full bg-gradient-to-r from-red-500/80 to-red-600/90 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-red-500/30 hover:shadow-red-400/40 hover:from-red-500/90 hover:to-red-600/100 hover:-translate-y-1 transition-all duration-300"
          >
            🚪 Sign Out
          </button>
        </div>

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
<!--            class="google-login-popup"-->
        <button
            @click="loginWithPopup"
            class="bg-[#f0cdff] hover:shadow-2xl hover:border shadow-md font-bold px-16 py-3 rounded-full"
        >
          {{ label }}
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

const props = defineProps({
  label: {
    type: String,
    required: true,
  }
})

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

</style>