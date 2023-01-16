import React, {useEffect, useState} from 'react';
import './CountDown.css';
import dayjs from 'dayjs';


const defaultRemainingTime = {
    seconds: '00',
    minutes: '00'
}

const getRemainingTimeUntillTimestamp = (timestampInMs) => {
    const timeStampDayjs = dayjs(timestampInMs)
    const nowDayjs = dayjs()
    if(timeStampDayjs.isBefore(nowDayjs)){
        //instead you can do a function here, 
        //maybe recieve the navigate and navigate 
        //to another page or otherwise get the state to a new 
        //screen or somehting you will feel is best for your flow 
        return defaultRemainingTime
    }
    return{
        seconds: getRemainingTime(nowDayjs, timeStampDayjs, "seconds", 60),
        minutes: getRemainingTime(nowDayjs, timeStampDayjs, "minutes"),
    }
}
const padWithZeroes = (number, minLength) => {
    const numberString = number.toString();
    if(numberString.length >= minLength){
        return numberString
    }
    return "0".repeat(minLength - numberString.length) + numberString

}
const getRemainingTime = (nowDayjs, timeStampDayjs, timeType) => {
    return padWithZeroes((timeStampDayjs.diff(nowDayjs, timeType) % 60) , 2)
}
const CountDown = ({timestamp}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
    
    const updateRemainingTime = (countdownTimestamp) => {
        setRemainingTime(getRemainingTimeUntillTimestamp(countdownTimestamp))
    }

    useEffect(()=>{
        const intervalId = setInterval(() => {
            console.log('hello')
            updateRemainingTime(timestamp)
        }, 1000);
        return () => {clearInterval(intervalId)}
    },[timestamp])
  return (
    <div className="countdown-timer">
       <span className='two-numbers'>{remainingTime.minutes}</span>
      <span>:</span>
       <span className='two-numbers'>{remainingTime.seconds}</span>
    </div>
  )
}

export default CountDown