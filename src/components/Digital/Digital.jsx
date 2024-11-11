import classNames from "classnames/bind";
import styles from "./Digital.module.scss";
const cx = classNames.bind(styles);
function Digital ({time}) {
    return (
        <span className={cx('led-digital')}>
            {time}
        </span>
    )
}

export default Digital;