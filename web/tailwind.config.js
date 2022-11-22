/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        app: "url('/effects.png')",
      },
      colors: {
        bank: {
          primary: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#111111',
          quaternary: '#c5c5c5',
          // success: '#ffffff',
          // info: '#000000,',
          // warning: '#ffffff',
          // danger: '#DC143C',
          // light: '#F0F8FF',
          // dark: '#000000',
        },
        ignite: {
          500: '#129E57'
        },
        yellow: {
          500: '#F7DD43',
          700: '#E5CD3D'
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
        primary: '#036B52',
        secondary: '#2FC18C',
        tertiary: '#421981',
        quaternary: '#056CF9',
        success: '#3CB371',
        info: '#1E90FF',
        warning: '#FFD700',
        danger: '#DC143C',
        light: '#F0F8FF',
        dark: '#000000',
      },
    },
  },
  plugins: [],
}
