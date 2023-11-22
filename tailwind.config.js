/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "back-Img": "url('./src/images/music.jpg')"
            }
        },
    },
    plugins: [],
}

