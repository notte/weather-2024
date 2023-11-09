/** @type {import('tailwindcss').Config} */
module.exports = {
  // content 配置 tailwind 要處理的文件。
  // 只有在這裡配置的文件，才能使用 tailwind 的樣式，進而由 PostCSS 打包進實際項目中
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}