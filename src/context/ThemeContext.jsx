import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        } else {
            localStorage.setItem('theme', 'light');
            return 'light';
        }
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark');
            setTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.body.classList.remove('dark');
            setTheme('light');
        }
    };

    return <ThemeContext.Provider value={[theme, toggleTheme]}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
