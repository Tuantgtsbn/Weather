import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './dailyweather.module.scss';
import { DateTime } from 'luxon';
const cx = classNames.bind(styles);

function DailyWeather({ data }) {
    const time = DateTime.fromISO(data.time.time).setZone(data.time.name).setLocale('en');
    var dayOfWeek = null;
    if (time.toISODate() === DateTime.now().setZone(data.time.name).toISODate()) {
        dayOfWeek = 'Today';
    } else {
        dayOfWeek = time.weekdayShort;
    }
    const temperatureMax = data.temperatureMax.toFixed(1);
    const temperatureMin = data.temperatureMin.toFixed(1);
    const value = {
        day: dayOfWeek,
        icon: data.weatherCode + '0',
        temp: `${temperatureMax}/${temperatureMin}`
    };

    return (
        <div className={cx('content')}>
            <p className={cx('day')}>{value.day}</p>
            <img className={cx('icon')} src={`weather-icon/${value.icon}.png`} alt='' />
            <p className={cx('temperature')}>{value.temp}℃</p>
        </div>
    );
}
DailyWeather.propTypes = {
    data: PropTypes.object
};
export default DailyWeather;
