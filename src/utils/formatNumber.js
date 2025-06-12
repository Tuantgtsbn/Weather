function NumberFormat(number, exact = 1) {
    if (number == Number.parseInt(number)) {
        return number;
    } else {
        return Math.ceil(number * 10 ** exact) / 10 ** exact;
    }
}
export default NumberFormat;

function formatBigNumber(numberString) {
    if (!numberString) return 0;
    const newString = (numberString + '').split('.')[0];
    const arr = [];
    for (let i = newString.length; i > 0; i -= 3) {
        arr.push(newString.substring(i - 3, i));
    }
    return arr.reverse().join('.');
}
export { formatBigNumber };
