/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

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
            backgroundImage: {
                "project-title-gradient":
                    "linear-gradient(0deg, var(--black) 43.4px, transparent 43.4px)",
                "project-title-gradient-lg":
                    "linear-gradient(0deg,var(--black) 74.4px,transparent 74.4px)",
                "post-title-gradient":
                    "linear-gradient(180deg,var(--black) 44.1px,transparent 44.1px)",
                "slider-title-gradient":
                    "linear-gradient(180deg,var(--black) 70.8px,transparent 70.8px)",
                "intro-title-gradient":
                    "radial-gradient(40px circle at var(--x) var(--y),rgba(0, 0, 0, 0) 100%,var(--black))",
            },
            lineHeight: {
                2: "0.5rem",
                11: "2.75rem",
                12: "3rem",
                13: "3.25rem",
                14: "3.5rem",
                15: "3.75rem",
                16: "4rem",
                17: "4.25rem",
                18: "4.5rem",
                19: "4.75rem",
                20: "5rem",
                21: "5.25rem",
                22: "5.5rem",
                23: "5.75rem",
                24: "6rem",
                32: "8rem",
                36: "9rem",
                37: "9.25rem",
                38: "9.5rem",
                39: "9.75rem",
                40: "10rem",
                44: "11rem",
                48: "12rem",
            },
            cursor: {
                none: "none",
            },
            typography: {
                0: {
                    css: {
                        fontSize: "0",
                    },
                },
                8: {
                    css: {
                        fontSize: "8px",
                    },
                },
                10: {
                    css: {
                        fontSize: "10px",
                    },
                },
                12: {
                    css: {
                        fontSize: "12px",
                    },
                },
                14: {
                    css: {
                        fontSize: "14px",
                    },
                },
                16: {
                    css: {
                        fontSize: "16px",
                    },
                },
                18: {
                    css: {
                        fontSize: "18px",
                    },
                },
                20: {
                    css: {
                        fontSize: "20px",
                    },
                },
                22: {
                    css: {
                        fontSize: "22px",
                    },
                },
                24: {
                    css: {
                        fontSize: "24px",
                    },
                },
                26: {
                    css: {
                        fontSize: "26px",
                    },
                },
                28: {
                    css: {
                        fontSize: "28px",
                    },
                },
                30: {
                    css: {
                        fontSize: "30px",
                    },
                },
                32: {
                    css: {
                        fontSize: "32px",
                    },
                },
                34: {
                    css: {
                        fontSize: "34px",
                    },
                },
                36: {
                    css: {
                        fontSize: "36px",
                    },
                },
                48: {
                    css: {
                        fontSize: "48px",
                    },
                },
                50: {
                    css: {
                        fontSize: "50px",
                    },
                },
                54: {
                    css: {
                        fontSize: "54px",
                    },
                },
                60: {
                    css: {
                        fontSize: "60px",
                    },
                },
                70: {
                    css: {
                        fontSize: "70px",
                    },
                },
                80: {
                    css: {
                        fontSize: "80px",
                    },
                },
                90: {
                    css: {
                        fontSize: "90px",
                    },
                },
                120: {
                    css: {
                        fontSize: "120px",
                    },
                },
                140: {
                    css: {
                        fontSize: "140px",
                    },
                },
            },
            colors: {
                melrose: "var(--melrose)",
                pink: "var(--pink)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                black: "var(--black)",
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
            "sm": "640px",
            "md": "768px",
            "lg": "1024px",
            "xl": "1240px",
            "2xl": "1240px",
            "standalone": { raw: "(display-mode: standalone)" },
        },
        container: {
            padding: {
                "DEFAULT": "15px",
                "sm": "15px",
                "lg": "0",
                "xl": "0",
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
