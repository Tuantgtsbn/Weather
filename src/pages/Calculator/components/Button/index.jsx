/* eslint-disable react/prop-types */
import classNames from 'classnames';
import styles from './Button.module.scss';
function ButtonCalculator({ content, onClick, className, variant = 'primary', ...props }) {
    const styleVariant = {
        primary: '',
        plus: styles.plus,
        equal: styles.equal,
        clear: styles.clear
    };
    return (
        <div
            {...props}
            className={classNames(styles.btnContainer, className, styleVariant[variant])}
            onClick={() => onClick(content)}
        >
            <h2 className='text-xl'>{content}</h2>
        </div>
    );
}

export default ButtonCalculator;
