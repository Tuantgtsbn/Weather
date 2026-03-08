import { useEffect, useRef, useState } from 'react';
import formatTime from '../../utils/formatTime';
import styles from './CountUpTimer.module.scss';
import classNames from 'classnames/bind';
import Results from '@/components/Results';
import Button from '@/components/Button';
const cx = classNames.bind(styles);

function CountUpTimer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState(
        () => JSON.parse(localStorage.getItem('countUpResults')) || []
    );
    const timerRef = useRef(null);
    const startTime = useRef(null);
    const handleReset = () => {
        const data = {
            startTime: startTime.current,
            endTime: new Date().toLocaleString(),
            duration: time
        };
        setResults((prevResults) => {
            const newResults = [...prevResults, data];
            localStorage.setItem('countUpResults', JSON.stringify(newResults));
            return newResults;
        });
        setTime(0);
        setIsRunning(false);
    };
    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(timerRef.current);
        }
        return () => {
            clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

    const handleDeleteResults = () => {
        localStorage.removeItem('countUpResults');
        setResults([]);
    };
    return (
        <>
            <h1 className={cx('time')}>{formatTime(time)}</h1>
            {isRunning ? (
                <div className={cx('group_btn')}>
                    <Button
                        className={cx('btn_stop', 'btn')}
                        onClick={() => {
                            setIsRunning(false);
                        }}
                    >
                        Dừng
                    </Button>
                    <Button className={cx('btn_reset', 'btn')} onClick={handleReset}>
                        Khởi động lại
                    </Button>
                </div>
            ) : (
                <div className={cx('group_btn')}>
                    <Button
                        className={cx('btn_start', 'btn')}
                        onClick={() => {
                            if (time == 0) {
                                startTime.current = new Date().toLocaleString();
                            }
                            setIsRunning(true);
                        }}
                    >
                        {time != 0 ? 'Tiếp tục' : 'Bắt đầu'}
                    </Button>
                    {time != 0 ? (
                        <Button className={cx('btn_reset', 'btn')} onClick={handleReset}>
                            Khởi động lại
                        </Button>
                    ) : (
                        false
                    )}
                </div>
            )}
            <div className={cx('list_data')}>
                <h2 className='text-2xl font-bold'>Dữ liệu bấm giờ</h2>
                {<Results datas={results} />}
            </div>
            <div className={cx('group_btn')}>
                <Button className='btn_delete' onClick={handleDeleteResults}>
                    Xóa dữ liệu
                </Button>
            </div>
        </>
    );
}

export default CountUpTimer;
