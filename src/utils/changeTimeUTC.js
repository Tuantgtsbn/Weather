class Time {
    constructor(date) {
        this.date = new Date(date);
    }
    getDateMonthYear() {
        const date = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        return `${date}/${month}/${year}`;
    }
    getHour() {
        return this.date.getHours();
    }
    getDayOfWeek() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[this.date.getDay()];
    }
    getHourMinute() {
        const hour = this.date.getHours();
        const minute = this.date.getMinutes();
        return `${hour}:${minute}`;
    }
}

export default Time;