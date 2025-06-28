import { useState } from 'react';
import ButtonCalculator from '../../components/Calculator/Button';
import styles from './Calculator.module.scss';
import classNames from 'classnames';
import { evaluate } from 'mathjs';
import { toast } from 'react-toastify';
function Calculator() {
    const onClick = (data) => {
        switch (data) {
            case 'AC':
                setInputValue('');
                break;
            case 'DC':
                setInputValue(inputValue.slice(0, -1));
                break;
            case 'x':
                setInputValue(inputValue + '*');
                break;
            case ':':
                setInputValue(inputValue + '/');
                break;
            case '=':
                try {
                    setInputValue(evaluate(inputValue.trim()));
                } catch (error) {
                    toast.warning('Biểu thức không hợp lệ', {
                        autoClose: 2000
                    });
                }
                break;
            default:
                setInputValue((inputValue + data).trim());
                break;
        }
    };
    const [inputValue, setInputValue] = useState('');
    return (
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.container)}>
                <h2 className={classNames(styles.title)}>CASIO</h2>
                <div>
                    <input type='text' value={inputValue} className={styles.input} readOnly />
                </div>
                <div className={classNames(styles.numberContainer)}>
                    <ButtonCalculator
                        className={'button'}
                        variant='clear'
                        onClick={onClick}
                        content='AC'
                    />
                    <ButtonCalculator className={'button'} onClick={onClick} content='DC' />
                    <ButtonCalculator className={'button'} onClick={onClick} content=':' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='x' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='7' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='8' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='9' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='-' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='4' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='5' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='6' />
                    <ButtonCalculator
                        className={'button'}
                        variant='plus'
                        onClick={onClick}
                        content='+'
                    />
                    <ButtonCalculator className={'button'} onClick={onClick} content='1' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='2' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='3' />

                    <ButtonCalculator className={'button'} onClick={onClick} content='00' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='0' />
                    <ButtonCalculator className={'button'} onClick={onClick} content='.' />
                    <ButtonCalculator
                        className={'button'}
                        variant='equal'
                        onClick={onClick}
                        content='='
                    />
                </div>
            </div>
        </div>
    );
}

export default Calculator;
