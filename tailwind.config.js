/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: '#1e1f22',
          darker: '#111214',
          light: '#2b2d31',
          lighter: '#313338',
          hover: '#404249',
          text: '#dbdee1',
          muted: '#949ba4',
          accent: '#5865f2',
          accentHover: '#4752c4',
          green: '#23a559',
          input: '#383a40',
        }
      }
    },
  },
  plugins: [],
}
