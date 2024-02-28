/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html',
  'scripts/*/*{html,js}'
  // Ajoutez tous les autres chemins de fichiers nécessaires
],
  theme: {
    extend: {
      colors: {
        customYellow: '#ffd15b',
        lightGrey: '#C6C6C6',
    },
  },
  plugins: [],
}

}