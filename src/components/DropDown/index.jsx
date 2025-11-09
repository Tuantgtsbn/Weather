import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './DropDown.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Menu } from 'lucide-react';
const cx = classNames.bind(styles);
function DropDown({ options }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { pathname } = useLocation();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('dropdown')} ref={dropdownRef}>
            <button className={cx('dropdown_button')} onClick={() => setIsOpen(!isOpen)}>
                <Menu />
            </button>
            {isOpen && (
                <ul className={cx('dropdown_menu')}>
                    {options.map((option, index) => (
                        <Link
                            key={index}
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            to={option.path}
                            className={cx('dropdown_item', {
                                'dropdown_item--selected': option.path.includes(pathname)
                            })}
                        >
                            {option.label}
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
}
DropDown.propTypes = {
    options: PropTypes.array.isRequired
};
export default DropDown;
