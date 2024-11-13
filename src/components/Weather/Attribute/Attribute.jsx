import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './attribute.module.scss';
const cx = classNames.bind(styles);
function Attribute({ data, title }) {
    
        let field = '';
        let value = '';

        switch (title) {
            case 'Temperature':
                field = 'Real Feel';
                value = Math.ceil(data.values.temperatureApparent * 10) / 10 + '°C';
                break;
            case 'Wind':
                field = 'Wind';
                value = data.values.windSpeed + ' km/h';
                break;
            case 'Humidity':
                field = 'Humidity';
                value = Number(data.values.humidity) + '%';
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
                value = Number(data.values.rainIntensity) + '%';
                break;
            default:
                field = 'Unknown';
                value = 'Unknown';
        }

        const values = {field, value};
    

    return (
        <div className={cx('content')}>
            <h3 className={cx('field')}>{values.field}</h3>
            <p className={cx('value')}>{values.value}</p>
        </div>
    );
}

Attribute.propTypes = {
    data: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default Attribute;
