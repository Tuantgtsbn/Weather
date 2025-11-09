import PropTypes from 'prop-types';
import styles from './Hourweather.module.scss';
import classNames from 'classnames/bind';
import NumberFormat from '../../../../utils/formatNumber';
import { DateTime } from 'luxon';
const cx = classNames.bind(styles);
function HourWeather({ data }) {
    console.log(data, data);
    const time = DateTime.fromISO(data.time.time).setZone(data.time.name);
    console.log(time.hour);
    const hour = time.hour;
    const weatherIcon = data.weatherCode + (hour >= 18 || hour <= 6 ? '1' : '0');
    return (
        <div className={cx('content')}>
            <p className={cx('hour')}>{hour} h</p>
            <img className={cx('icon')} src={`weather-icon/${weatherIcon}.png`} alt='' />
            <p className={cx('temperature')}>{NumberFormat(data.temperature)}℃</p>
        </div>
    );
}

HourWeather.propTypes = {
    data: PropTypes.object
};
export default HourWeather;
