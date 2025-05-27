// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@formkit/nuxt'],
  formkit:{
    autoImport: true,
  },
  runtimeConfig:{
    public:{
      backendUrl: "https://dermatutus.alif.top" //http://152.118.31.20:8081"
    },
    backendUrl: "https://dermatutus.alif.top"//http://dermatitis_backend:8000",
  },

})