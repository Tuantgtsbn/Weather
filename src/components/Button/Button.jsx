import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
import PropTypes from 'prop-types';
function Button ({onClick, className,children}) {
    return (
        <button onClick={onClick} className={cx(className,'btn')}>
            {children}
        </button>
    )
}
Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
}
export default Button;