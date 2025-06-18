import classNames from 'classnames';
function TableCaro({ sizeBoard, onClickCell, boardState }) {
    return (
        <div className='flex justify-center items-center'>
            <table
                className={classNames('border-collapse border border-slate-400 overflow-x-auto', {
                    'min-w-[400px]': sizeBoard === 10,
                    'min-w-[600px]': sizeBoard === 15,
                    'min-w-[800px]': sizeBoard === 20
                })}
            >
                <tbody>
                    {Array.from({ length: sizeBoard }, (_, i) => (
                        <tr key={i}>
                            {Array.from({ length: sizeBoard }, (_, j) => (
                                <td
                                    key={j}
                                    className={classNames(
                                        'w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] border border-slate-300 text-[25px] lg:text-[40px] text-center',
                                        {
                                            'cursor-pointer': !boardState[i]?.[j],
                                            'cursor-not-allowed': boardState[i]?.[j]
                                        }
                                    )}
                                    onClick={(e) => onClickCell(e, i, j)}
                                >
                                    {boardState[i]?.[j] === 'X' && (
                                        <span className='text-red-500 font-bold'>X</span>
                                    )}
                                    {boardState[i]?.[j] === 'O' && (
                                        <span className='text-blue-500 font-bold'>O</span>
                                    )}
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
