// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@formkit/nuxt', 'nuxt-auth-utils'],
  formkit:{
    autoImport: true,
  },
  runtimeConfig:{
    public:{
      backendUrl: "https://dermatutus.alif.top", //http://152.118.31.20:8081"
      authUrl: process.env.NUXT_PUBLIC_AUTH_URL || 'http://localhost:3000'
    },
    backendUrl: "https://dermatutus.alif.top",//http://dermatitis_backend:8000",
    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
        redirectURL: process.env.NUXT_PUBLIC_AUTH_URL
      }
    }
  },

})