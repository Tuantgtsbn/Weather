// import {useState, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import styles from './ChoicesCountDown.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function ChoicesCountDown({time, setTime, setIsStart}) {
    const handleChangesOptionTime = (e) => {
        const {name, value} = e.target;
        setTime(prevTime => ({
            ...prevTime,
            [name]: Number(value)
        }))
        
    }
    const handleStartTimer = () => {
        setIsStart(true);
    }
    const handleChooseTime = (e) => {
        const {countdown} = e.currentTarget.dataset;
        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;
        setTime({
            hours,
            minutes,
            seconds
        });
        setIsStart(true);
    }
    return (
        
            <>
                <h2>Đặt một đồng hồ hẹn giờ</h2>
                <div className={cx('options')}>
                    <div className={cx('hours_container','option')}>
                        <label className={cx('label')} htmlFor="hours" >Số giờ</label>
                        <select id="hours" value={time.hours} className={cx('list_select')} onChange={handleChangesOptionTime} name="hours">
                            {
                                Array.from({length: 24}).map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                ))
                            }
                            
                            
                        </select>
    
                    </div>
                    <div className={cx('minutes-container','option')}>
                        <label className={cx('label')} htmlFor="minutes">Số phút</label>
                        <select id="minutes" className={cx('list_select')} onChange={handleChangesOptionTime} name="minutes" value={time.minutes}>
                            {
                                Array.from({length: 60}).map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={cx('seconds-container','option')}>
                        <label className={cx('label')} htmlFor="seconds">Số giây</label>
                        <select onChange={handleChangesOptionTime} name="seconds" id="seconds" className={cx('list_select')} value={time.seconds}>
                            {
                                Array.from({length: 60}).map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                ))
                            }
                        </select>
                    </div>
    
                </div>
                <div className={cx('suggests_time')}>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="15" >
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 15 giây</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="20">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 20 giây</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="30">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 30 giây</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="45">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 45 giây</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="60">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 1 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="300">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 5 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="600">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 10 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="900">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 15 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="1200">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 20 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="1500">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 25 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="1800">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 30 phút</span>
                    </div>
                    <div className={cx('template_time')} onClick={handleChooseTime} data-countdown="2700">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('time')}> 45 phút</span>
                    </div>
                </div>
                <button className={cx('start_btn')} onClick={handleStartTimer}>Bắt đầu hẹn giờ</button>
            </>
        
    )
}
ChoicesCountDown.propTypes = {
    time: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number
    }),
    setTime: PropTypes.func,
    setIsStart: PropTypes.func
}
export default ChoicesCountDown;