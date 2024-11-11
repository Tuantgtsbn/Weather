import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
import styles from './Zone.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles); 
function Zone ({zone, func, onClick}) {
    
    const {city, countryCode, timeZone} = zone;
    const [time, setTime] = useState(func(timeZone));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(func(timeZone));
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('container')}>
            <div className={cx('countryCode')}>
                {countryCode}
            </div>
            <div className={cx('right')} onClick={onClick}>
                <div className={cx('city')}>
                    {city}
                </div>
                <div className={cx('time')}>
                    {days[time.weekday]} - {time.hour.toString().padStart(2,'0')}:{time.minute.toString().padStart(2,'0')}
                </div>
            </div>
        </div>
    )
}

Zone.propTypes = {
    zone: PropTypes.shape({
        city: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        timeZone: PropTypes.string.isRequired
    }).isRequired,
    func: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}
export default Zone;