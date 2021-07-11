require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: "'Larsseit'",
            serif: "'Larsseit'",
            mono: "'Larsseit'",
            base: "'Larsseit'",
            flight: "'Larsseit-Light'",
            fbold: "'Larsseit-Bold'",
        },
        extend: {
            cursor: {
                none: 'none',
            },
            typography: {
                "12px": {
                    css: {
                        fontSize: "12px",
                        lineHeight: "12px",
                    },
                },
                "14px": {
                    css: {
                        fontSize: "14px",
                        lineHeight: "10px",
                    },
                },
                "16": {
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
                "18": {
                    css: {
                        fontSize: "18px",
                    },
                },
                "20px": {
                    css: {
                        fontSize: "20px",
                        lineHeight: "26px",
                    },
                },
                "24px": {
                    css: {
                        fontSize: "24px",
                        lineHeight: "32px",
                    },
                },
                "28px": {
                    css: {
                        fontSize: "28px",
                        lineHeight: "34px",
                    },
                },
                "24": {
                    css: {
                        fontSize: "24px",
                    },
                },
                "30px": {
                    css: {
                        fontSize: "30px",
                        lineHeight: "42px",
                    },
                },
                "48px": {
                    css: {
                        fontSize: "48px",
                        lineHeight: "56px",
                    },
                },
                "60": {
                    css: {
                        fontSize: "60px",
                    },
                },
                "70": {
                    css: {
                        fontSize: "70px",
                        lineHeight: "80px",
                    },
                },
                "80": {
                    css: {
                        fontSize: "80px",
                    },
                },
                "90": {
                    css: {
                        fontSize: "90px",
                    },
                },
                "120": {
                    css: {
                        fontSize: "120px",
                    },
                },
                "140": {
                    css: {
                        fontSize: "140px",
                        lineHeight: "151px",
                    },
                },
            },
            colors: {
                melrose: "var(--melrose-color)",
                pink: 'var(--pink-color)',
                "primary-color": "var(--primary-color)",
                "secondary-color": "var(--secondary-color)",
                "tertiary-color": "var(--tertiary-color)",
                "black-color": "var(--black-color)",
                "melrose-color": "var(--melrose-color)",
                "green": "var(--green-color)",
            },
            zIndex: {
                75: 75,
                100: 100,
            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1240px",
            "2xl": "1240px",
        },
        container: {
            padding: {
                DEFAULT: "15px",
                sm: "15px",
                lg: "0",
                xl: "0",
                "2xl": "0",
            },
        },
    },
    corePlugins: {
        outline: false,
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
