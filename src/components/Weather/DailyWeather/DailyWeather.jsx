import Time from "../../../utils/changeTimeUTC";
import { useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./dailyweather.module.scss";
const cx = classNames.bind(styles);
function DailyWeather({data}) {
  const [value] = useState(() => {
    const time = new Time(data.time);
    var dayOfWeek = null;
    if (time.date.getDate() === new Date().getDate()) {
      dayOfWeek = "Today";
    } else {
      dayOfWeek = time.getDayOfWeek().substring(0, 3);
    }
    const temperatureMax = data.values.temperatureMax.toFixed(1);
    const temperatureMin = data.values.temperatureMin.toFixed(1);
    return {
        day: dayOfWeek,
        icon: data.values.weatherCodeMax,
        temp: `${temperatureMax}/${temperatureMin}`,
    }
  });

  return (
    <div className={cx('content')}>
      <p className={cx('day')}>{value.day}</p>
      <img className={cx('icon')} src="weather-icon/10000_clear_large.png" alt="" />
      <p className={cx('temperature')}>{value.temp}℃</p>
    </div>
  );
}
DailyWeather.propTypes = {
  data: PropTypes.object,
};
export default DailyWeather;