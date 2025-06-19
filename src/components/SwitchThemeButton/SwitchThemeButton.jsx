import styles from './SwitchThemeButton.module.scss';
import useTheme from '../../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function SwitchThemeButton() {
    const [theme, toggleTheme] = useTheme();
    return (
        <button
            className={cx('button', {
                dark: theme === 'dark'
            })}
            onClick={toggleTheme}
        >
            {theme === 'dark' ? <Moon /> : <Sun />}
        </button>
    );
}
export default SwitchThemeButton;
