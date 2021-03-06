require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            typography: {
                "16px": {
                    css: {
                        fontSize: "16px",
                        lineHeight: "20px",
                    },
                },
                "18px": {
                    css: {
                        fontSize: "18px",
                        lineHeight: "20px",
                    },
                },
                "24px": {
                    css: {
                        fontSize: "24px",
                        lineHeight: "32px",
                    },
                },
                "30px": {
                    css: {
                        fontSize: "30px",
                        lineHeight: "42px",
                    },
                },
                "70px": {
                    css: {
                        fontSize: "70px",
                        lineHeight: "80px",
                    },
                },
                "140px": {
                    css: {
                        fontSize: "140px",
                        lineHeight: "151px",
                    },
                },
            },
            colors: {
                melrose: "#C0A4FF",
                "primary-color": "var(--primary-color)",
                "secondary-color": "var(--secondary-color)",
                "tertiary-color": "var(--tertiary-color)",
                "black-color": "var(--black-color)",
                "melrose-color": "var(--melrose-color)",
            },
        },
        fontFamily: {
            sans: "'Larsseit'",
            serif: "'Larsseit'",
            mono: "'Larsseit'",
            base: "'Larsseit'",
        },
        screens: {
            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1440px",
            // => @media (min-width: 1536px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
