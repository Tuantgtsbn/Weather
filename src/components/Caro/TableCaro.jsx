import classNames from 'classnames';
import { checkStraight } from '@/utils';
function TableCaro({ sizeBoard, board, onClickCell, resultWin, lastMove, winner }) {
    const isWin = winner !== '';
    console.log(winner);
    console.log(resultWin);
    console.log(lastMove);
    const isHighlight = (i, j) => {
        if (!isWin) return false;
        let result1 = false;
        let result2 = false;
        let result3 = false;
        let result4 = false;
        if (resultWin.horizontal) {
            result1 =
                lastMove.x === i &&
                resultWin.horizontal.start <= j &&
                resultWin.horizontal.end >= j;
        }
        if (resultWin.vertical) {
            result2 =
                lastMove.y === j && resultWin.vertical.start <= i && resultWin.vertical.end >= i;
        }
        if (resultWin.rightDiagonal) {
            result3 = checkStraight(
                resultWin.rightDiagonal.start,
                { x: i, y: j },
                resultWin.rightDiagonal.end
            );
        }
        if (resultWin.leftDiagonal) {
            result4 = checkStraight(
                resultWin.leftDiagonal.start,
                { x: i, y: j },
                resultWin.leftDiagonal.end
            );
        }
        return result1 || result2 || result3 || result4;
    };
    return (
        <div
            className={classNames('flex justify-center items-center', {
                'min-w-[400px] lg:min-w-[800px]': sizeBoard === 10 || sizeBoard === 20,
                'min-w-[450px] lg:min-w-[900px]': sizeBoard === 15,
                '!min-w-[600px]': sizeBoard === 20
            })}
        >
            <table className={classNames('border-collapse border border-slate-400')}>
                <tbody>
                    {Array.from({ length: sizeBoard }, (_, i) => (
                        <tr key={i}>
                            {Array.from({ length: sizeBoard }, (_, j) => (
                                <td
                                    key={j}
                                    className={classNames(
                                        ' border border-slate-300 text-center cursor-pointer',
                                        {
                                            'w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] text-[25px] lg:text-[40px]':
                                                sizeBoard === 10,
                                            'w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] text-[19px] lg:text-[35px]':
                                                sizeBoard === 15,
                                            'w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] lg:text-[25px] text-[20px]':
                                                sizeBoard === 20,
                                            'text-red-500': board[i][j] === 'X',
                                            'text-blue-500': board[i][j] === 'O',
                                            'bg-yellow-100': lastMove?.x === i && lastMove?.y === j,
                                            '!bg-red-500 !text-white':
                                                isWin &&
                                                winner === 'X' &&
                                                board[i][j] === 'X' &&
                                                isHighlight(i, j),
                                            '!bg-blue-500 !text-white':
                                                isWin &&
                                                board[i][j] === 'O' &&
                                                winner === 'O' &&
                                                isHighlight(i, j)
                                        }
                                    )}
                                    onClick={(e) => onClickCell(e, i, j)}
                                >
                                    {board[i][j] && board[i][j]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableCaro;
