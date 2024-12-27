import styles from './SwitchThemeButton.module.scss';
import useTheme from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
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
      <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
    </button>
  );
}
export default SwitchThemeButton;
