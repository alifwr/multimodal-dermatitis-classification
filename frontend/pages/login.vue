<template>
  <div class="container">
    <header class="app-header">
      <h1>Multimodal Dermatitis AI</h1>
      <p class="subtitle">Silahkan Login untuk mendapatkan akses ke aplikasi Multimodal Dermatitis AI</p>
    </header>

    <AuthButton label="Login dengan Google" />

    <!-- Protected content that only shows for authenticated users -->
    <AuthState v-slot="{ loggedIn, user }">
      <section v-if="loggedIn" class="flex w-full bg-blue-100 px-10 py-4 rounded-2xl justify-center">
          <NuxtLink href="/predict" class="text-3xl text-center">Go To Multimodal Dermatitis AI</NuxtLink>
<!--        <h2>🔒 Protected Content</h2>-->
<!--        <p>This content is only visible to authenticated users.</p>-->

<!--        <div class="user-data">-->
<!--          <h3>Your Session Data:</h3>-->
<!--          <pre>{{ JSON.stringify(user, null, 2) }}</pre>-->
<!--        </div>-->

<!--        <div class="api-demo">-->
<!--          <h3>Protected API Test:</h3>-->
<!--          <button @click="testProtectedAPI" :disabled="loading">-->
<!--            {{ loading ? 'Loading...' : 'Test Protected Endpoint' }}-->
<!--          </button>-->
<!--          <div v-if="apiResult" class="api-result">-->
<!--            <strong>API Response:</strong>-->
<!--            <pre>{{ apiResult }}</pre>-->
<!--          </div>-->
<!--        </div>-->
      </section>
    </AuthState>
  </div>
</template>

<script setup>
const { loggedIn } = useUserSession()

// Redirect if already authenticated
watch(loggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    navigateTo('/predict')
  }
}, { immediate: true })
// Set page metadata
// useHead({
//   title: 'Nuxt Auth Utils Demo',
//   meta: [
//     { name: 'description', content: 'Google OAuth with Nuxt Auth Utils' }
//   ]
// })

// const loading = ref(false)
// const apiResult = ref(null)

// const testProtectedAPI = async () => {
//   loading.value = true
//   try {
//     const { data } = await $fetch('/api/protected')
//     apiResult.value = data
//   } catch (error) {
//     apiResult.value = { error: error.message }
//   } finally {
//     loading.value = false
//   }
// }
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 1.1rem;
}

.protected-content {
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 1px solid #0ea5e9;
}

.protected-content h2 {
  color: #0c4a6e;
  margin-bottom: 1rem;
}

.user-data, .api-demo {
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.user-data h3, .api-demo h3 {
  margin-top: 0;
  color: #374151;
}

pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
}

.api-demo button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.api-demo button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.api-demo button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.api-result {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}
</style>