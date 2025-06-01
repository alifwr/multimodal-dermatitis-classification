<template>
  <div>
    <Login v-if="!loggedIn" />
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
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
</script>