/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            textColor: {

                'TextClr': '#b4b2b2',
                'hClr': '#302f2f',
                'forgotPasswordTextClr': '#3AB19B',
            },
            backgroundColor: {
                'bg-clr': 'white',
                'loginSlidingPortion': '#3AB19B',
            },
        },
    },
    plugins: [],
}