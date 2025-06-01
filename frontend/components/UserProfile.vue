<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex items-center space-x-4">
      <img
          :src="user.picture"
          :alt="user.name"
          class="w-16 h-16 rounded-full border-2 border-gray-200"
      >
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-gray-900">{{ user.name }}</h2>
        <p class="text-gray-600">{{ user.email }}</p>
      </div>
      <button
          @click="handleSignOut"
          :disabled="pending"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {{ pending ? 'Signing out...' : 'Sign Out' }}
      </button>
    </div>

    <div class="mt-6 border-t pt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">User Information</h3>
      <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt class="text-sm font-medium text-gray-500">Full Name</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ user.name }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Email</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ user.email }}</dd>
        </div>
        <div v-if="user.given_name">
          <dt class="text-sm font-medium text-gray-500">First Name</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ user.given_name }}</dd>
        </div>
        <div v-if="user.family_name">
          <dt class="text-sm font-medium text-gray-500">Last Name</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ user.family_name }}</dd>
        </div>
        <div v-if="user.locale">
          <dt class="text-sm font-medium text-gray-500">Locale</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ user.locale }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Verified Email</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <span :class="user.email_verified ? 'text-green-600' : 'text-red-600'">
              {{ user.email_verified ? 'Yes' : 'No' }}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
const { data: user } = await useUserSession()
const pending = ref(false)

const handleSignOut = async () => {
  try {
    pending.value = true
    await $fetch('/api/auth/logout', { method: 'POST' })
    await navigateTo('/login')
  } catch (error) {
    console.error('Sign out error:', error)
  } finally {
    pending.value = false
  }
}
</script>