export default function changeToSeconds (time) {
    return time.hours * 3600 + time.minutes * 60 + time.seconds;
}