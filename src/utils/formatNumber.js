function NumberFormat(number) {
    if (number == Number.parseInt(number)) {
        return number;
    } else {
        return Math.ceil(number * 10) / 10;
    }
}
export default NumberFormat;