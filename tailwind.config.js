/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        "auto":"repeat(auto-fill ,minmax(260px,1fr))"
      }
    },
  },
  plugins: [],
}

