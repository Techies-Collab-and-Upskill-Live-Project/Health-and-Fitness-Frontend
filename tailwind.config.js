/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#E5F6D3',
          2: '#D4F0B5',
          3: '#BEE990',
          4: '#A9E26B',
          5: '#93DA46',
          6: '#7ED321',
          7: '#69B01C',
          8: '#548D16',
          9: '#3F6A11',
          10: '#2A460B',
          11: '#192A07',
          "light": '#7DD421'
        },
        secondary: {
          1: '#FFEDCC',
          2: '#FFE1AA',
          3: '#FFE1AA',
          4: '#FFC355',
          5: '#FFB42B',
          6: '#FFA500',
          7: '#D48900',
          8: '#AA6E00',
          9: '#805300',
          10: '#553700',
          11: '#332100'
        },
        tomato: {
          1: '#FFE0DA',
          2: '#FFCBC2',
          3: '#FFB1A3',
          4: '#FF9784',
          5: '#FF7D66',
          6: '#FF6347',
          7: '#D4533B',
          8: '#AA422F',
          9: '#803224',
          10: '#552118',
          11: '#33140E'
        },
        grey: {
          1: '#D0D0D3',
          2: '#B1B1B6',
          3: '#8A8992',
          4: '#63626E',
          5: '#3C3B49',
          6: '#151425',
          7: '#12111F',
          8: '#0E0D19',
          9: '#0B0A13',
          10: '#07070C',
          11: '#040407'
        },
        white: {
          1: '#D9D9D9',
          2: '#F8F8F8',
          3: '#F5F5F5',
          4: '#FFFFFF'
        },
        accent: {
          4: '#FF9784',
          6: '#FF6347',
        },
        error: '#E0010F',
        success: '#2FD305',
        warning: '#FED51F',
        tomatoCommon: '#FF5D5E',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        scale: 'scale 2s cubic-bezier(.42,0,.58,1)',
        fade: 'fade 2s cubic-bezier(.42,0,.58,1)',
        fadeOut: "fadeOut 1s 1.5s cubic-bezier(.42,0,.58,1)",
        fadeOutImg1: "fadeOut 1s 3.4s cubic-bezier(.42,0,.58,1)",
        fadeOutImg: "fadeOut 1s 1.3s cubic-bezier(.42,0,.58,1)",
        textAnim: "fadeOut 0.8s 1.6s cubic-bezier(.42,0,.58,1), textAnim 1s cubic-bezier(.42,0,.58,1)",
        textAnim1: "fadeOut 1s 3.4s cubic-bezier(.42,0,.58,1), textAnim 1s 1.5s cubic-bezier(.42,0,.58,1)",
        lastText: "textAnim 1s cubic-bezier(.42,0,.58,1), fadeIn 0.5s ease-in",
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(4)' },
          "100%": { transform: "scale(2.7)" }
        },
        fade: {
          '0%': { opacity: 0, transform: 'scale(3) translateY(3rem)' },
          '50%': { opacity: 1, transform: 'scale(3) translateY(1.2rem)' },
          '100%': { transform: 'scale(1.5) translateY(1.2rem)' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        textAnim: {
          '0%': { transform: 'translateY(30px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      backgroundImage: {
        'on-boarding': "url('/SignUpBG.png')",
      },
      screens: {
        'xs': { 'raw': '(max-width: 350px)' },
      }
    },
    plugins: [],
  }
}