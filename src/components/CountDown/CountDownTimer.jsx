import { useEffect, useRef, useState } from "react"
import {formatTime} from "../../utils";
import classNames from "classnames/bind";
import styles from "./CountDownTimer.module.scss";
import Digital from "../Digital/Digital";
import Results from "../Results/Results";
import Button from "../Button/Button";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function CountDownTimer({initialState=120, setIsStart,setTime :setInitialTime}) {
  const [time, setTime] = useState(initialState);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef(null);
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem('countDownResults')) || []
  );
  const startTime = useRef(new Date().toLocaleString());
  console.log(startTime.current);
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);
  function handleStart() {
    if(time == initialState) {
      startTime.current = new Date().toLocaleString();
    }
    setIsRunning(true);
  }
  function handleReset() {
    const data ={
      startTime: startTime.current,
      endTime: new Date().toLocaleString(),
      duration: initialState - time
    }
    setResults(prevResults => {
      const newResults = [...prevResults, data];
      localStorage.setItem('countDownResults', JSON.stringify(newResults));
      return newResults;
    });
    setTime(initialState);
    setIsRunning(false);
  }

  function handleDeleteResults() {
    setResults([]);
    localStorage.removeItem('countDownResults');
  }

  function handleBack() {
    // setIsRunning(false);
    setInitialTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    setIsStart(false);
    }

  return (
    <>
      <CircularProgressbarWithChildren
        value={time * 100 / initialState}
        styles={buildStyles({
          pathColor: '#38bdf8',
          trailColor: '#babbc2'
        })}
      >
      <h2>Đồng hồ đếm ngược</h2>
      <h1 className={cx('time')}>
        {
          formatTime(time).split('').map((item, index) => (
            <Digital key={index} time={item} />
          ))
        }
      </h1>
      </CircularProgressbarWithChildren>
      {
        isRunning ? (
          <div className={cx('group_btn')}>
            <Button className='btn_stop' onClick={() => {
              setIsRunning(false);
            }}>
              Tạm dừng
            </Button>
            <Button className='btn_reset' onClick={handleReset}>
              Khởi động lại
            </Button>
            <Button className='btn_back' onClick={handleBack}>
              Quay lại
            </Button>
          </div>
        ) : (
          <div className={cx('group_btn')}>
            <Button className='btn_start' onClick={handleStart}>
              {time != initialState ? 'Tiếp tục' : 'Bắt đầu'}
            </Button>
            {time != initialState ? <Button className='btn_reset' onClick={
              handleReset
            }>Khởi động lại</Button> : false
            }
            <Button className='btn_back' onClick={handleBack}>
              Quay lại
            </Button>
          </div>
        )
      }
      <div className={cx('list_data')}>
        <h2>Dữ liệu của đồng hồ hẹn giờ</h2>
        {
          <Results datas={results} />
        }
      </div>
      <div className={cx('group_btn')}>
        
          <Button className='btn_export' onClick={handleDeleteResults}>Xuất file CSV</Button>
          <Button className='btn_delete' onClick={handleDeleteResults}>Xóa dữ liệu</Button>
        
      </div>
    </>
    
  )
}
CountDownTimer.propTypes = {
  initialState: PropTypes.number,
  setIsStart: PropTypes.func,
  setTime: PropTypes.func
}
export default CountDownTimer;