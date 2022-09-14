require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

var typography = {
    0: {
        css: {
            fontSize: "0",
        },
    }
}

for (var i = 0; i <= 140; i += 2) {
    typography[i] = {
        css: {
            fontSize: String(i) + "px",
        },
    }
}

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
            lineHeight: {
                '2': '0.5rem',
                '11': '2.75rem',
                '12': '3rem',
                '13': '3.25rem',
                '14': '3.5rem',
                '15': '3.75rem',
                '16': '4rem',
                '17': '4.25rem',
                '18': '4.5rem',
                '19': '4.75rem',
                '20': '5rem',
                '21': '5.25rem',
                '22': '5.5rem',
                '23': '5.75rem',
                '24': '6rem',
                '32': '8rem',
                '36': '9rem',
                '37': '9.25rem',
                '38': '9.5rem',
                '39': '9.75rem',
                '40': '10rem',
                '44': '11rem',
                '48': '12rem',
            },
            cursor: {
                none: "none",
            },
            typography: typography,
            colors: {
                melrose: "var(--melrose)",
                pink: "var(--pink)",
                "primary": "var(--primary)",
                "secondary": "var(--secondary)",
                "tertiary": "var(--tertiary)",
                "black": "var(--black)",
                green: "var(--green)",
            },
            zIndex: {
                60: 60,
                70: 70,
                80: 80,
                90: 90,
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
