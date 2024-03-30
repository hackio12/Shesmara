/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    backgroundImage: {
      'white-gradient': 'radial-gradient(white, #fff0)',
    }
  }
};
export const plugins = [];
export const esModule = true;