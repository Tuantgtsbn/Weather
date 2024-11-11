
import PropTypes from "prop-types";
import Time from "../../../utils/changeTimeUTC";
import styles from "./hourweather.module.scss";
import classNames from "classnames/bind";
import NumberFormat from "../../../utils/formatNumber";
const cx = classNames.bind(styles);
function HourWeather({data}) {
  const date = new Time(data.time);
  const hour = date.getHour();

  return (
    <div className={cx('content')}>
      <p className={cx('hour')}>{hour}</p>
      <img className={cx('icon')}src="weather-icon/10000_clear_large.png" alt="" />
      <p className={cx('temperature')}>{NumberFormat(data.values.temperature)}℃</p>
    </div>
  );
}
HourWeather.propTypes = {
  data: PropTypes.object,
};
export default HourWeather;
