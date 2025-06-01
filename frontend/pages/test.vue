<template>
  <div class="p-8">
    <h1>Auth Test Page</h1>
    <pre>{{ session }}</pre>
    <button @click="testAuth" class="bg-blue-500 text-white px-4 py-2 rounded">
      Test Auth
    </button>
  </div>
</template>

<script setup>
const { data: session } = await useUserSession()

const testAuth = async () => {
  console.log('Session:', session.value)
  console.log('Available routes:', await $fetch('/api/_nitro/routes'))
}
</script>