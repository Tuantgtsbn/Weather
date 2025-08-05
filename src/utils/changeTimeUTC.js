class Time {
    constructor(date) {
        this.date = new Date(date);
    }
    getDateMonthYear() {
        const date = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        return `${date.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
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
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
}

export default Time;
