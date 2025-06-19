export default function checkStraightAndBetween(pointStart, pointEnd, pointCheck) {
    return (
        pointEnd.x >= Math.min(pointStart.x, pointCheck.x) &&
        pointEnd.x <= Math.max(pointStart.x, pointCheck.x) &&
        pointEnd.y >= Math.min(pointStart.y, pointCheck.y) &&
        pointEnd.y <= Math.max(pointStart.y, pointCheck.y) &&
        (pointEnd.x - pointStart.x) * (pointCheck.y - pointEnd.y) ===
            (pointEnd.y - pointStart.y) * (pointCheck.x - pointEnd.x)
    );
}
