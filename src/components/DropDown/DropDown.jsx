import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './DropDown.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Menu } from 'lucide-react';
const cx = classNames.bind(styles);
function DropDown({ options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);
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
                                setSelectedOption(option);
                                onSelect(option);
                                setIsOpen(false);
                            }}
                            to={option.path}
                            className={cx('dropdown_item', {
                                'dropdown_item--selected': selectedOption === option
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
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
};
export default DropDown;
