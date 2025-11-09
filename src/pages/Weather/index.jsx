import { useState, useEffect, useRef } from 'react';
import HourWeather from './components/HourWeather/HourWeather';
import Attribute from './components/Attribute/Attribute';
import DailyWeather from './components/DailyWeather/DailyWeather';
import styles from './weather.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import NumberFormat from '../../utils/formatNumber';
import {
    CloudHail,
    Droplet,
    Eye,
    Info,
    RotateCw,
    Search,
    Sun,
    Thermometer,
    Wind
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
const apiKeyGeocode = import.meta.env.VITE_API_KEY_OPENCAGEDATA;
const apiKeyTomorrow = import.meta.env.VITE_API_KEY_TOMORROW;

function Weather() {
    const [search, setSearch] = useState(localStorage.getItem('search'));
    const searchRef = useRef(null);
    const [weatherData, setWeatherData] = useState(null);
    const [stateGetWeatherData, setStateGetWeatherData] = useState({
        isLoading: false,
        isError: false,
        isSuccess: false
    });
    const date = weatherData?.current?.time ? new Date(weatherData.current.time) : new Date();
    const hour = date.getHours();

    const weatherIcon =
        weatherData?.current?.values?.weatherCode + (hour >= 18 || hour <= 6 ? '1' : '0');

    const getDataWeatherCurrentPosition = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    try {
                        const results = await Promise.all([
                            fetch(
                                `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lng}&apikey=${apiKeyTomorrow}&lang=vi&units=metric`
                            ).then((response) => response.json()),
                            fetch(
                                `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKeyGeocode}&language=vi`
                            )
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data && data.results && data.results.length) {
                                        return data.results[0];
                                    } else {
                                        throw new Error('No results found');
                                    }
                                })
                        ]);
                        const weatherData = results[0];
                        const geocodeData = results[1];
                        const address = {
                            timezone: {
                                name: geocodeData.annotations.timezone.name,
                                offset_sec: geocodeData.annotations.timezone.offset_sec,
                                offset_string: geocodeData.annotations.timezone.short_name
                            },
                            address: geocodeData.formatted
                        };
                        setWeatherData({
                            current: {
                                ...weatherData.timelines.minutely[0]
                            },
                            hourly: weatherData.timelines.hourly.slice(0, 24),
                            daily: weatherData.timelines.daily.slice(0, 7),
                            address
                        });
                        setStateGetWeatherData({
                            isLoading: false,
                            isError: false,
                            isSuccess: true
                        });
                    } catch (error) {
                        toast.error('Không thể lấy dữ liệu thời tiết');
                        setStateGetWeatherData({
                            isLoading: false,
                            isError: true,
                            isSuccess: false
                        });
                    }
                },
                () => {
                    toast.error('Không thể lấy địa chỉ từ tọa độ hiện tại');
                    setStateGetWeatherData({
                        isLoading: false,
                        isError: true,
                        isSuccess: false
                    });
                }
            );
        } else {
            toast.error('Trình duyệt không hỗ trợ chức năng định vị địa lý');
        }
    };

    const getDataWeatherSearchPosition = (search) => {
        fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=${apiKeyGeocode}&lang=vi`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.total_results > 0) {
                    const address = {
                        timezone: {
                            name: data.results[0].annotations.timezone.name,
                            offset_sec: data.results[0].annotations.timezone.offset_sec,
                            offset_string: data.results[0].annotations.timezone.short_name
                        },
                        address: data.results[0].formatted
                    };
                    const { lat, lng } = data.results[0].geometry;
                    fetch(
                        `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lng}&apikey=${apiKeyTomorrow}&lang=vi&units=metric`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setWeatherData({
                                current: {
                                    ...data.timelines.minutely[0],
                                    city: search
                                },
                                hourly: data.timelines.hourly.slice(0, 24),
                                daily: data.timelines.daily.slice(0, 7),
                                address
                            });
                            setStateGetWeatherData({
                                isLoading: false,
                                isError: false,
                                isSuccess: true
                            });
                        });
                } else {
                    throw new Error('No results found');
                }
            })
            .catch(() => {
                toast.error('Không tìm thấy vị trí bạn yêu cầu');
                setStateGetWeatherData({
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                });
            });
    };

    useEffect(() => {
        if (search && search.length > 0) {
            getDataWeatherSearchPosition(search);
            localStorage.setItem('search', search);
        } else {
            getDataWeatherCurrentPosition();
            localStorage.removeItem('search');
        }
    }, [search]);

    const changeCity = () => {
        var inputValue = searchRef.current.value;
        inputValue = inputValue.trim();
        if (inputValue && inputValue.length > 0) {
            setSearch(inputValue);
        }
    };

    return (
        <div className={cx('content')}>
            <div className='col-span-6 flex gap-2.5 '>
                {stateGetWeatherData.isLoading ? (
                    <>
                        <Skeleton className='h-[34px] flex-1' />
                        <Skeleton className='w-[44px]' />
                    </>
                ) : (
                    <>
                        <input
                            className='px-[10px] py-[5px] flex-1 rounded-[5px] bg-[#dee2f9] border-none text-'
                            ref={searchRef}
                            type='text'
                            name='search'
                            id='search'
                            placeholder='Search cities'
                        />
                        <button
                            onClick={changeCity}
                            className='border-none px-[5px] py-[10px] rounded-[5px] hover:bg-[#ccc]'
                        >
                            <Search />
                        </button>
                    </>
                )}
            </div>
            {weatherData?.current ? (
                <div className={cx('currentweather')}>
                    <div className={cx('left')}>
                        <div className='flex items-center flex-wrap gap-2 relative pr-[30px]'>
                            <p className={cx('city', 'line-clamp-2')}>
                                {search || weatherData?.address?.address}
                            </p>
                            <span className='absolute right-0 top-[15px]'>
                                <Popover>
                                    <PopoverTrigger>
                                        <Info size={16} />
                                    </PopoverTrigger>
                                    <PopoverContent>{weatherData?.address?.address}</PopoverContent>
                                </Popover>
                            </span>
                        </div>
                        <p className={cx('temperature')}>
                            {NumberFormat(weatherData.current.values.temperature)}℃
                        </p>
                        <div>
                            <p className={cx('lastUpdated')}>
                                <span>Last updated: </span>
                                {`${new Date(
                                    new Date(weatherData.current.time).getTime() +
                                        weatherData.address.timezone.offset_sec * 1000
                                )
                                    .toISOString()
                                    .slice(11, 16)} 
                                (UTC${weatherData.address.timezone.offset_string})`}
                                <RotateCw
                                    className='hover:cursor-pointer inline-block ml-[10px]'
                                    onClick={() => getDataWeatherSearchPosition(search)}
                                />
                            </p>
                        </div>
                    </div>

                    <img src={`weather-icon/${weatherIcon}.png`} className={cx('right')} alt='' />
                </div>
            ) : (
                <div className={cx('currentweather')}>
                    <Skeleton className='w-full h-[180px]' />
                </div>
            )}

            {weatherData?.hourly ? (
                <div className={cx('hourweather')}>
                    <h2 className={cx('text')}>Today&apos;s forecast</h2>
                    <div className={cx('listhourweather')}>
                        {weatherData.hourly.map((weatherHour, index) => {
                            return (
                                <HourWeather
                                    key={index}
                                    data={{
                                        time: {
                                            ...weatherData.address.timezone,
                                            time: weatherHour.time
                                        },
                                        temperature: weatherHour.values.temperature,
                                        weatherCode: weatherHour.values.weatherCode
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className={cx('hourweather')}>
                    <Skeleton className='w-full mb-5 h-[30px]' />
                    <div className='overflow-x-auto'>
                        <div className={cx('w-max overflow-x-auto flex gap-4')}>
                            {Array.from({ length: 20 }).map((_, index) => (
                                <Skeleton key={index} className='w-[63px]! h-[120px]' />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {weatherData?.daily ? (
                <div className={cx('dailyweather')}>
                    <h2 className={cx('text')}>7 days forecast</h2>
                    <div className={cx('listdailyweather')}>
                        {weatherData.daily.map((weatherDay, index) => {
                            return (
                                <DailyWeather
                                    key={index}
                                    data={{
                                        time: {
                                            ...weatherData.address.timezone,
                                            time: weatherDay.time
                                        },
                                        weatherCode: weatherDay.values.weatherCodeMax,
                                        temperatureMax: weatherDay.values.temperatureMax,
                                        temperatureMin: weatherDay.values.temperatureMin
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className={cx('dailyweather')}>
                    <Skeleton className='w-full mb-5 h-[30px]' />
                    <div className={cx('listdailyweather')}>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <Skeleton key={index} className='w-full h-[88px]' />
                        ))}
                    </div>
                </div>
            )}
            {weatherData?.current ? (
                <div className={cx('attributes')}>
                    <h2 className={cx('text')}>Air conditions</h2>
                    <div className={cx('listAttributes')}>
                        <Attribute
                            data={{
                                field: 'Real Feel',
                                value: `${NumberFormat(weatherData.current.values.temperatureApparent)}℃`,
                                icon: Thermometer
                            }}
                        />
                        <Attribute
                            data={{
                                field: 'Wind',
                                value: `${NumberFormat(weatherData.current.values.windSpeed)} m/s`,
                                icon: Wind
                            }}
                        />
                        <Attribute
                            data={{
                                field: 'Humidity',
                                value: `${NumberFormat(weatherData.current.values.humidity)}%`,
                                icon: Droplet
                            }}
                        />
                        <Attribute
                            data={{
                                field: 'UV Index',
                                value: `${NumberFormat(weatherData.current.values.uvIndex)}`,
                                icon: Sun
                            }}
                        />
                        <Attribute
                            data={{
                                field: 'Visibility',
                                value: `${NumberFormat(weatherData.current.values.visibility)}℃`,
                                icon: Eye
                            }}
                        />
                        <Attribute
                            data={{
                                field: 'Chance of Rain',
                                value: `${NumberFormat(weatherData.current.values.precipitationProbability)}%`,
                                icon: CloudHail
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className={cx('attributes')}>
                    <Skeleton className='w-full mb-5 h-[30px]' />
                    <div className={cx('listAttributes')}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className='w-[45%] h-[120px]' />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
