import { useState, useEffect } from 'react';
import styles from './Clock.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import Zone from './Zone';
import { Earth } from 'lucide-react';
function getDateTimeObject(timeZone) {
    const date = new Date().toLocaleString('en-US', { timeZone: timeZone });
    const dateObj = new Date(date);

    return {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1, // Tháng trong JavaScript bắt đầu từ 0, nên cần +1
        day: dateObj.getDate(),
        hour: dateObj.getHours(),
        minute: dateObj.getMinutes(),
        second: dateObj.getSeconds(),
        weekday: dateObj.getDay()
    };
}
const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const formatDay = (weekday) => {
    return days[weekday];
};
const cities = [
    {
        city: 'Hà Nội',
        countryCode: 'VN',
        timeZone: 'Asia/Ho_Chi_Minh'
    },
    {
        city: 'Amsterdam',
        countryCode: 'NL',
        timeZone: 'Europe/Amsterdam'
    },
    {
        city: 'Athens',
        countryCode: 'GR',
        timeZone: 'Europe/Athens'
    },
    {
        city: 'Băng Cốc',
        countryCode: 'TH',
        timeZone: 'Asia/Bangkok'
    },
    {
        city: 'Beograd',
        countryCode: 'RS',
        timeZone: 'Europe/Belgrade'
    },
    {
        city: 'Berlin',
        countryCode: 'DE',
        timeZone: 'Europe/Berlin'
    },
    {
        city: 'Cape Town',
        countryCode: 'ZA',
        timeZone: 'Africa/Johannesburg'
    },
    {
        city: 'Dubai',
        countryCode: 'AE',
        timeZone: 'Asia/Dubai'
    },
    {
        city: 'Jakata',
        countryCode: 'ID',
        timeZone: 'Asia/Jakarta'
    },
    {
        city: 'Paris',
        countryCode: 'FR',
        timeZone: 'Europe/Paris'
    },
    {
        city: 'Seoul',
        countryCode: 'KR',
        timeZone: 'Asia/Seoul'
    },
    {
        city: 'Thượng Hải',
        countryCode: 'CN',
        timeZone: 'Asia/Shanghai'
    },
    {
        city: 'Sydney',
        countryCode: 'AU',
        timeZone: 'Australia/Sydney'
    },
    {
        city: 'New York',
        countryCode: 'US',
        timeZone: 'America/New_York'
    },
    {
        city: 'Tokyo',
        countryCode: 'JP',
        timeZone: 'Asia/Tokyo'
    }
];
function Clock() {
    const [timeZone, setTimeZone] = useState(
        () => Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const [time, setTime] = useState(getDateTimeObject(timeZone));
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getDateTimeObject(timeZone));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [timeZone]);
    useEffect(() => {
        document.title = 'Đồng hồ thế giới';
    }, []);
    const handleChangeTimeZone = (timeZone) => {
        setTimeZone(timeZone);
    };
    return (
        <>
            <div className={cx('system_datetime')}>
                <div className={cx('system_date')}>
                    {formatDay(time.weekday)}, {time.day}/{time.month}/{time.year}
                </div>
                <div className={cx('system_time')}>
                    {time.hour.toString().padStart(2, '0')}:
                    {time.minute.toString().padStart(2, '0')}:
                    {time.second.toString().padStart(2, '0')}
                </div>
                <div className={cx('system_timeZone')}>{timeZone}</div>
            </div>
            <div className={cx('world_clock')}>
                <h2 className={cx('title')}>
                    <Earth className={cx('icon')} />
                    Danh sách các thành phố
                </h2>
                <div className={cx('list_cities')}>
                    {cities.map((city, index) => {
                        return (
                            <Zone
                                key={index}
                                zone={city}
                                func={getDateTimeObject}
                                onClick={() => {
                                    handleChangeTimeZone(city.timeZone);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
export default Clock;
