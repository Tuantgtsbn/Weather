import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './attribute.module.scss';
const cx = classNames.bind(styles);
function Attribute({ data }) {
    const { field, value, icon: Icon } = data;
    return (
        <div className={cx('content')}>
            {<Icon className={cx('icon')} />}
            <div className={cx('wrapper_value')}>
                <h3 className={cx('field')}>{field}</h3>
                <p className={cx('value')}>{value}</p>
            </div>
        </div>
    );
}

Attribute.propTypes = {
    data: PropTypes.object.isRequired
};

export default Attribute;
