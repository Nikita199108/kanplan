"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") === "dark";
        setDark(saved);
        document.documentElement.classList.toggle("dark", saved);
    }, []);

    function toggle() {
        const newTheme = !dark;
        setDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        document.documentElement.classList.toggle("dark", newTheme);
    }

    return (
        <button
            onClick={toggle}
            className="fixed top-4 right-20 z-50 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}