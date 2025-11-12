/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
            colors: {
                base: "var(--color-base)",
                primary: "var(--color-primary)",
                success: "var(--color-success)",
                error: "var(--color-error)",
                warning: "var(--color-warning)",
                info: "var(--color-info)",
            },
        },
    },
    plugins: [typography],
};
