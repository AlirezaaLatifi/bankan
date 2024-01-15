/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "todo-100": "#fef4f3",
                "todo-200": "#f3e1df",
                "todo-300": "#d4afb4",
                "todo-400": "#6e1e29",
                "doing-100": "#fffbf2",
                "doing-200": "#eae2cf",
                "doing-300": "#decca4",
                "doing-400": "#795b19",
                "done-100": "#f4f9f3",
                "done-200": "#ddeed9",
                "done-300": "#bcd7b6",
                "done-400": "#286c1a",
            },
            fontSize: {
                heading: "3.4rem",
                desc: "1.6rem",
                colHeading: "1.5rem",
                taskCount: "1.2rem",
                task: "1.2rem",
                addTask: "1.5rem",
            },
        },
    },
    plugins: [],
};
