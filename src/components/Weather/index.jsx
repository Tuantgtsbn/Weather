import { useState, useEffect, useRef } from 'react';
import HourWeather from './HourWeather/HourWeather';
import Attribute from './Attribute/Attribute';
import DailyWeather from './DailyWeather/DailyWeather';
import styles from './weather.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import Time from '../../utils/changeTimeUTC';
import NumberFormat from '../../utils/formatNumber';
import { Thermometer, Wind, Droplet, CloudHail, Sun, Eye, Search, RotateCw } from 'lucide-react';
// import {faSun,faEye} from '@fortawesome/free-regular-svg-icons';
function Weather() {
    const arrTitles = [
        {
            title: 'Temperature',
            icon: Thermometer
        },
        {
            title: 'Wind',
            icon: Wind
        },
        {
            title: 'Humidity',
            icon: Droplet
        },
        {
            title: 'UV Index',
            icon: Sun
        },
        {
            title: 'Visibility',
            icon: Eye
        },
        {
            title: 'Chance of Rain',
            icon: CloudHail
        }
    ];
    const [search, setSearch] = useState('Hà Đông');
    const [dataHour, setDataHour] = useState(null);
    const [dataDaily, setDataDaily] = useState(null);
    const [dataCurrent, setDataCurrent] = useState(null);
    const searchRef = useRef(null);
    console.log('Data Current', dataCurrent);
    console.log('Data Hour ', dataHour);
    console.log('Data Daily', dataDaily);
    console.log('Search', search);
    const callApi = () => {
        fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=a98acee141024ac1872f6fb2fb4c9cb1&lang=vi`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.total_results > 0) {
                    const { lat, lng } = data.results[0].geometry;
                    fetch(
                        `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lng}&apikey=dKzvnaXdc1zFNcGz7axEusk22e2B76m6&lang=vi&units=metric`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            setDataHour(data.timelines.hourly.slice(0, 24));
                            setDataDaily(data.timelines.daily.slice(0, 7));
                            setDataCurrent({
                                ...data.timelines.minutely[0],
                                city: search
                            });
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        document.title = 'Thời tiết';
        callApi();
    }, [search]);
    const changeCity = () => {
        var inputValue = searchRef.current.value;
        inputValue = inputValue.trim();
        setSearch(inputValue);
    };

    return (
        <div className={cx('content')}>
            <div className={cx('input')}>
                <input
                    ref={searchRef}
                    type='text'
                    name='search'
                    id='search'
                    placeholder='Search cities'
                />
                <button onClick={changeCity}>
                    <Search />
                </button>
            </div>
            {dataCurrent ? (
                <div className={cx('currentweather')}>
                    <div className={cx('left')}>
                        <p className={cx('city')}>{dataCurrent.city}</p>
                        <p className={cx('temperature')}>
                            {NumberFormat(dataCurrent.values.temperature)}℃
                        </p>
                        <p className={cx('lastUpdated')}>
                            <span>Last updated: </span>
                            {new Time(dataCurrent.time).getHourMinute()}
                        </p>
                        <div onClick={callApi} className={cx('reload')}>
                            <RotateCw />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <img src='weather-icon/10000_clear_large.png' alt='' />
                    </div>
                </div>
            ) : null}

            {dataHour ? (
                <div className={cx('hourweather')}>
                    <h2 className={cx('text')}>Today&apos;s forecast</h2>
                    <div className={cx('listhourweather')}>
                        {dataHour.map((data, index) => {
                            return <HourWeather key={index} data={data} />;
                        })}
                    </div>
                </div>
            ) : null}
            {dataCurrent ? (
                <div className={cx('attributes')}>
                    <h2 className={cx('text')}>Air conditions</h2>
                    <div className={cx('listAttributes')}>
                        {arrTitles.map((attr, index) => {
                            return <Attribute key={index} data={dataCurrent} attr={attr} icon />;
                        })}
                    </div>
                </div>
            ) : null}

            {dataDaily ? (
                <div className={cx('dailyweather')}>
                    <h2 className={cx('text')}>7 days forecast</h2>
                    <div className={cx('listdailyweather')}>
                        {dataDaily.map((data, index) => {
                            return <DailyWeather key={index} data={data} />;
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Weather;
