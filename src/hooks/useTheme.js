import { useEffect, useState } from 'react'
const useTheme = () => {
    const getInitialTheme = () => {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme')
        } else {
            localStorage.setItem('theme', 'light')
            return 'light'

        }
    }
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }
    return [theme, toggleTheme]
}
export default useTheme

