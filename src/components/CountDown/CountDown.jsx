import {useState, useEffect} from "react";
import ChoicesCountDown from "./ChoicesCountDown";
import CountDownTimer from "./CountDownTimer";
import { changeToSeconds } from "../../utils";
function CountDown() {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isStart, setIsStart] = useState(false);
    useEffect(() => {
        document.title = 'Đồng hồ đếm ngược';
      },[])
    return (
        <div>
            {
                !isStart ? <ChoicesCountDown time={time} setTime={setTime} setIsStart={setIsStart} /> : <CountDownTimer initialState={changeToSeconds(time)} setIsStart={setIsStart} setTime={setTime} />
            }
        </div>
    )
}

export default CountDown;