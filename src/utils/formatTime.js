
function formatTime (time) {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    time %= 3600;
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    time %= 60;
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
export default formatTime;