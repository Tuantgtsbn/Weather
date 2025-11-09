import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import DropDown from '../DropDown';
import SwitchThemeButton from '../SwitchThemeButton';
import { useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Header({ title }) {
    const options = useMemo(
        () => [
            { label: 'Đồng hồ đếm ngược', path: '/timer' },
            { label: 'Đồng hồ đếm giờ', path: '/stopwatch' },
            { label: 'Đồng hồ thế giới', path: '/clock' },
            { label: 'Thời tiết', path: '/weather' },
            { label: 'Máy tính cầm tay', path: '/calculator' },
            { label: 'Tỷ giá tiền tệ', path: '/currency' },
            { label: 'Trò chơi Caro', path: '/caro' },
            {
                label: 'Xoay ngẫu nhiên',
                path: '/wheel-random'
            },
            {
                label: 'Luyện gõ 10 ngón',
                path: '/type-word'
            }
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
            <DropDown options={options} />
            <h1 className={cx('title')}>{title}</h1>
            <SwitchThemeButton />
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
