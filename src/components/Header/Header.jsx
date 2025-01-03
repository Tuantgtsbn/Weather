/* eslint-disable react/prop-types */
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import DropDown from '../DropDown/DropDown';
import SwitchThemeButton from '../SwitchThemeButton/SwitchThemeButton';
import { useMemo } from 'react';
const cx = classNames.bind(styles);
import useTheme from '../../hooks/useTheme';
function Header({ title }) {
  const options = useMemo(
    () => [
      { label: 'Đồng hồ đếm ngược', path: '/timer' },
      { label: 'Đồng hồ đếm giờ', path: '/stopwatch' },
      { label: 'Đồng hồ thế giới', path: '/clock' },
      { label: 'Thời tiết', path: '/weather' }
    ],
    []
  );
  const [theme] = useTheme();
  return (
    <header
      className={cx('navbar', {
        dark: theme === 'dark'
      })}
    >
      <DropDown options={options} onSelect={() => {}} />
      <h1 className={cx('title')}>{title}</h1>
      <SwitchThemeButton />
    </header>
  );
}

export default Header;
