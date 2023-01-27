/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.{html,js,vue,ts}',
    './src/components/**/*.{html,js,vue,ts}'
  ],
  theme: {
    extend: {
      colors: {
        whiterabbitred: '#e22e26',
        whiterabbitgray: '#55555b'
      }
    }
  },
  plugins: []
}
