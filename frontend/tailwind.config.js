/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            textColor: {

                'primaryTextClr': '#b4b2b2',
                'hClr': '#302f2f',
                'secondaryTextClr': '#3AB19B',
            },
            colors: {
                primary: " #663200",
                secondary: "#ff8901",
            },
            backgroundColor: {
                'primaryBg-clr': 'white',
                'secondaryBgClr': '#3AB19B',
            },
        },
    },
    plugins: [],
}