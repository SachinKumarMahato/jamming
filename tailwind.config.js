/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "backImg": "url('./images/jr-korpa-9XngoIpxcEo-unsplash')"
            }
        },
    },
    plugins: [],
}

