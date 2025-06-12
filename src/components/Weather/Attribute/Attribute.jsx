import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './attribute.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function Attribute({ data, attr }) {
    let field = '';
    let value = '';
    const { title, icon } = attr;
    switch (title) {
        case 'Temperature':
            field = 'Real Feel';
            value = Math.ceil(data.values.temperatureApparent * 10) / 10 + ' °C';
            break;
        case 'Wind':
            field = 'Wind';
            value = data.values.windSpeed + ' m/s';
            break;
        case 'Humidity':
            field = 'Humidity';
            value = Number(data.values.humidity) + ' %';
            break;
        case 'UV Index':
            field = 'UV Index';
            value = data.values.uvIndex;
            break;
        case 'Visibility':
            field = 'Visibility';
            value = Number(data.values.visibility) + ' km';
            break;
        case 'Chance of Rain':
            field = 'Chance of Rain';
            value = Number(data.values.rainIntensity) + ' %';
            break;
        default:
            field = 'Unknown';
            value = ' Unknown';
    }

    const values = { field, value };

    return (
        <div className={cx('content')}>
            <h3 className={cx('field')}>{values.field}</h3>
            <div className={cx('wrapper_value')}>
                <p className={cx('value')}>{values.value}</p>
                <FontAwesomeIcon icon={icon} className={cx('icon')} />
            </div>
        </div>
    );
}

Attribute.propTypes = {
    data: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired
};

export default Attribute;
