// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app.vue",
        "./formkit.theme.ts" // <-- add your theme file
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                opensauce: ['OpenSauceOne', 'sans-serif'],
                alegreya: ['Alegreya', 'sans-serif'],
                opensans: ['OpenSans', 'sans-serif'],
            }
        },
    },
    plugins: [],
}