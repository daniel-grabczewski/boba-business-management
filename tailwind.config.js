import daisyui from 'daisyui'

module.exports = {
  daisyui: {
    themes: ['light'],
  },
  content: [
    './client/**/*.{html,jsx,tsx}',
    './index.html',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'red-600': '#ef4444',
        'red-700': '#dc2626',
        'green-500': '#38a169',
        'green-700': '#2f855a',
        'purple-700': '#9B99FF',
        'home-rose': '#ffc5c7',
        'nav-grey': '#2B2B2B',
      },
      width: {
        128: '128px',
      },
      spacing: {
        128: '128px',
      },
      maxWidth: {
        '1/2': '50%',
        '3/5': '60%',
      },

      screens: {
        custom: '1350px',
      },
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      const newUtilities = {
        '.divTable': {
          display: 'table',
          width: '100%',
          'border-collapse': 'collapse',
        },
        '.divRow': {
          display: 'table-row',
        },
        '.divCell': {
          display: 'table-cell',
          border: '1px solid #ccc',
          padding: '16px',
          'text-align': 'left',
          'vertical-align': 'top',
        },
        '.divBody': {
          display: 'table-row-group',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
