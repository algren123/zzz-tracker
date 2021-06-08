import React, { useEffect, useState } from 'react';

export default function useDarkMode() {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        const backgroundImage = window.document.getElementById('background');

        root.classList.remove(colorTheme);
        root.classList.add(theme);

        if (backgroundImage && root.classList.contains('dark')) {
            backgroundImage.classList.add('splash-screen-dark');
            backgroundImage.classList.remove('splash-screen');
        } else if (backgroundImage && root.classList.contains('light')) {
            backgroundImage.classList.add('splash-screen');
            backgroundImage.classList.remove('splash-screen-dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}