<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <UserProfile v-if="user" />
      <div v-else class="flex justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: user, loggedIn } = await useUserSession()

// Redirect to login if not authenticated
watch(loggedIn, (isLoggedIn) => {
  if (!isLoggedIn) {
    navigateTo('/login')
  }
}, { immediate: true })
</script>