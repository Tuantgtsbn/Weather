
import PropTypes from "prop-types";
import Time from "../../../utils/changeTimeUTC";
import styles from "./hourweather.module.scss";
import classNames from "classnames/bind";
import NumberFormat from "../../../utils/formatNumber";
const cx = classNames.bind(styles);
function HourWeather({data}) {
  const date = new Time(data.time);
  const hour = date.getHour();
  const weatherIcon = data.values.weatherCode + (hour>=18||hour<=6?'1':'0');
  return (
    <div className={cx('content')}>
      <p className={cx('hour')}>{hour} h</p>
      <img className={cx('icon')}src={`weather-icon/${weatherIcon}.png`} alt="" />
      <p className={cx('temperature')}>{NumberFormat(data.values.temperature)}℃</p>
    </div>
  );
}
HourWeather.propTypes = {
  data: PropTypes.object,
};
export default HourWeather;
