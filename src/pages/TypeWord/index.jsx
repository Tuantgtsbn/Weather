import { Label } from '@/components/ui/label';
import classNames from 'classnames';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useEffect, useMemo, useRef, useState } from 'react';
import { vietNameseText, englishText } from '@/data/text';
import { countLengthOfText } from '@/utils/checkText';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import useDebourceScreen from '@/hooks/useDebourceScreen';
function TypeWord() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useDebourceScreen(() => {
        setScreenWidth(window.innerWidth);
    }, 1000);
    const [language, setLanguage] = useState('vietnamese');
    const [duration, setDuaration] = useState('60');
    const durationRef = useRef(duration);
    const listText = language === 'vietnamese' ? vietNameseText : englishText;
    const [index, setIndex] = useState(0);
    const arrayText = useMemo(() => {
        return listText.split('|');
    }, [language]);
    const hiddenDivRef = useRef(null);
    const [input, setInput] = useState('');
    const [lineStartIndex, setLineStartIndex] = useState(0);
    const [lines, setLines] = useState([]);
    const [correct, setCorrect] = useState([]);
    const [lineIndex, setLineIndex] = useState(1);
    const [result, setResult] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const inputRef = useRef(null);
    const handleClickButton = () => {
        if (startGame) {
            setIndex(0);
            setInput('');
            setLineStartIndex(0);
            setCorrect([]);
            setLineIndex(1);
            setResult({});
            setOpenModal(false);
            setDuaration(durationRef.current);
            setStartGame(false);
        } else {
            inputRef.current.focus();
            setStartGame(true);
        }
    };
    useEffect(() => {
        setIndex(0);
        setInput('');
        setLineStartIndex(0);
        setCorrect([]);
        setLineIndex(1);
        setResult({});
        setOpenModal(false);
        setDuaration(durationRef.current);
        setStartGame(false);
    }, [language, durationRef.current]);
    useEffect(() => {
        if (!startGame) return;
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [startGame]);
    const checkCorrect = (text) => {
        return text === arrayText[index];
    };
    useEffect(() => {
        if (!startGame) return;
        const timer = setInterval(() => {
            Number(duration) > 0 && setDuaration((prev) => String(prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [duration, startGame]);
    useEffect(() => {
        if (Number(duration) <= 0) {
            let inCorrectCount = 0;
            let correctCount = 0;
            for (let i = 0; i < correct.length; i++) {
                if (correct[i]) {
                    correctCount++;
                } else {
                    inCorrectCount++;
                }
            }
            setResult({
                incorrect: inCorrectCount,
                correct: correctCount,
                wpm: Math.round(
                    (countLengthOfText(arrayText.slice(0, index).join(' '), language) / 5 -
                        inCorrectCount) /
                        (Number(durationRef.current) / 60)
                )
            });
            setOpenModal(true);
        }
    }, [duration]);
    const handleChange = (e) => {
        const value = e.target.value;
        if (value[value.length - 1] === ' ') {
            setCorrect((prev) => [...prev, checkCorrect(value.trim())]);
            setInput('');
            setIndex(index + 1);
            setLineIndex((prev) => prev + 1);
        } else {
            setInput(value);
        }
    };
    useEffect(() => {
        const tempDiv = hiddenDivRef.current;
        if (!tempDiv) return;

        // Render từng từ để xác định từng dòng
        tempDiv.innerHTML = ''; // clear
        const tempSpans = [];
        arrayText.forEach((word, idx) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.setAttribute('data-index', idx);
            tempDiv.appendChild(span);
            tempSpans.push(span);
        });

        // Dựa vào offsetTop để tách dòng
        const lineMap = [];
        let currentTop = null;
        let currentLine = [];
        tempSpans.forEach((span, idx) => {
            const top = span.offsetTop;
            if (top !== currentTop) {
                if (currentLine.length > 0) {
                    lineMap.push(currentLine);
                }
                currentTop = top;
                currentLine = [idx];
            } else {
                currentLine.push(idx);
            }
        });
        if (currentLine.length > 0) lineMap.push(currentLine);

        setLines(lineMap);
    }, [arrayText, language]);
    useEffect(() => {
        if (lineIndex > lines[lineStartIndex]?.length) {
            setLineStartIndex((prev) => prev + 1);
            setLineIndex(1);
        }
    }, [lineIndex]);
    if (screenWidth < 1024) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[70vh] p-6 text-center'>
                <div className='bg-orange-50 dark:bg-slate-800 rounded-xl shadow-lg p-8 max-w-md border border-orange-200 dark:border-slate-700'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-16 w-16 mx-auto mb-4 text-orange-500 dark:text-orange-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                    </svg>
                    <h2 className='text-2xl font-bold mb-3 text-slate-800 dark:text-white'>
                        Chỉ hỗ trợ trên Desktop
                    </h2>
                    <p className='text-slate-600 dark:text-slate-300 mb-6'>
                        Tính năng luyện gõ 10 ngón cần màn hình lớn hơn để hoạt động tốt nhất. Vui
                        lòng truy cập bằng máy tính để có trải nghiệm tốt nhất.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className='flex items-center gap-6 mb-[30px]'>
                <Label className='text-xl font-bold'>Ngôn ngữ</Label>
                <Select defaultValue='vietnamese' value={language} onValueChange={setLanguage}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Chọn ngôn ngữ' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='vietnamese'>Tiếng Việt</SelectItem>
                            <SelectItem value='english'>English</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex items-center gap-6 mb-[30px]'>
                <Label className='text-xl font-bold'>Thời gian</Label>
                <Select
                    defaultValue='10'
                    value={durationRef.current}
                    onValueChange={(value) => {
                        setDuaration(value);
                        durationRef.current = value;
                    }}
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Chọn thời gian' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='30'>30s</SelectItem>
                            <SelectItem value='60'>60s</SelectItem>
                            <SelectItem value='120'>120s</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='p-4 max-w-max mx-auto mt-10'>
                <div className='p-4 rounded mb-2 text-lg overflow-y-hidden max-w-max'>
                    <div className='mb-5 text-2xl text-yellow-500'>{duration}</div>

                    <div className=''>
                        {lines[lineStartIndex]?.map((wordIndex) => (
                            <span
                                key={wordIndex}
                                className={classNames('text-2xl', {
                                    'text-green-500': wordIndex < index && correct[wordIndex],
                                    'text-red-500': wordIndex < index && !correct[wordIndex]
                                })}
                            >
                                {arrayText[wordIndex]}{' '}
                            </span>
                        ))}
                    </div>
                    <div className=''>
                        {lines[lineStartIndex + 1]?.map((wordIndex) => (
                            <span
                                key={wordIndex}
                                className={classNames('text-2xl', {
                                    'text-green-500': wordIndex < index && correct[wordIndex],
                                    'text-red-500': wordIndex < index && !correct[wordIndex]
                                })}
                            >
                                {arrayText[wordIndex]}{' '}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='flex gap-[10px]'>
                    <input
                        ref={inputRef}
                        type='text'
                        className='p-2 border border-gray-300 rounded text-lg flex-1'
                        value={input}
                        onChange={handleChange}
                        autoFocus
                        disabled={Number(duration) <= 0 || !startGame}
                    />
                    <Button className='h-auto' onClick={handleClickButton}>
                        {startGame ? 'Làm lại' : 'Bắt đầu'}
                    </Button>
                </div>
            </div>
            <div
                ref={hiddenDivRef}
                className='invisible fixed top-0 left-0 w-[600px] text-lg leading-normal'
                style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
            />
            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Kết quả</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <span className='font-bold'>Số từ đúng:</span> {result?.correct}
                        </div>
                        <div>
                            <span className='font-bold'>Số từ sai:</span> {result?.incorrect}
                        </div>
                        <div>
                            <span className='font-bold'>WPM:</span> {Math.round(result?.wpm || 0)}
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction>Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default TypeWord;
