// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  runtimeConfig:{
    public:{
      backendUrl: "http://152.118.31.20:8081" //http://152.118.31.20:8081"
    },
    // backendUrl: "http://dermatitis_backend:8000"
    backendUrl: "http://152.118.31.20:8081"
  }
})