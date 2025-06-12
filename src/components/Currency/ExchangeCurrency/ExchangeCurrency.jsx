import { useState } from 'react';
import styles from './ExchangeCurrency.module.scss';
import classNames from 'classnames/bind';
import NumberFormat from '../../../utils/formatNumber';
console.log(styles);
const cx = classNames.bind(styles);
function ExchangeCurrency({ data }) {
    console.log('data in ExchangeCurrency', data);
    const [currencyExchange, setCurrencyExchange] = useState('USD');
    const [currencyNeedExchange, setCurrencyNeedExchange] = useState('VND');
    const [valueInput, setValueInput] = useState('');
    const calculateExchange = () => {
        const currencyExchangeRate = data.find((item) => item.currency === currencyExchange);
        const currencyNeedExchangeRate = data.find(
            (item) => item.currency === currencyNeedExchange
        );
        console.log('currencyExchangeRate', currencyExchangeRate);
        console.log('currencyNeedExchangeRate', currencyNeedExchangeRate);
        if (!currencyExchangeRate || !currencyNeedExchangeRate) {
            return 0;
        }
        return NumberFormat(currencyExchangeRate.transfer / currencyNeedExchangeRate.transfer);
    };
    const calculateResult = () => {
        if (valueInput === '') {
            return 0;
        }
        return NumberFormat(valueInput * calculateExchange(), 2);
    };
    const checkValidate = (() => {
        if (valueInput === '') return true;
        const soThapPhanRegex = /^-?\d*\.?\d+$/;
        return soThapPhanRegex.test(valueInput);
    })();
    console.log('checkValidate', checkValidate);
    if (!data) {
        return null;
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={cx('container')}>
                <div className={cx('flexRow')}>
                    <div className={cx('inputContainer')}>
                        <label className={cx('label')}>Số tiền</label>
                        <input
                            type='text'
                            placeholder='Nhập số tiền cần quy đổi'
                            className={cx('input')}
                            value={valueInput}
                            onChange={(e) => setValueInput(e.target.value)}
                        />
                        <p
                            className={classNames('text-red-500 font-bold text-sm', {
                                'opacity-0': checkValidate
                            })}
                        >
                            {'Vui lòng nhập số tiền hợp lệ'}
                        </p>
                    </div>
                    <div className={cx('selectContainer')}>
                        <select
                            name=''
                            id=''
                            defaultValue={currencyExchange}
                            onChange={(e) => setCurrencyExchange(e.target.value)}
                        >
                            {data.map((item) => (
                                <option key={item.currency} value={item.currency}>
                                    {item.currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('flexRow')}>
                    <div className={cx('inputContainer')}>
                        <label className={cx('label')}>Số tiền quy đổi</label>
                        <input
                            type='text'
                            placeholder='0'
                            className={cx('input')}
                            readOnly
                            value={calculateResult()}
                        />
                    </div>
                    <div className={cx('selectContainer')}>
                        <select
                            name=''
                            id=''
                            defaultValue={currencyNeedExchange}
                            onChange={(e) => setCurrencyNeedExchange(e.target.value)}
                        >
                            {data.map((item) => (
                                <option key={item.currency} value={item.currency}>
                                    {item.currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx('flexRow')} style={{ backgroundColor: '#e5e5e5' }}>
                    <p>Tỷ giá tham khảo</p>
                    <p>
                        {' '}
                        1 {currencyExchange} ~{' '}
                        <span style={{ fontWeight: 700, marginRight: '5px' }}>
                            {calculateExchange()}
                        </span>
                        {currencyNeedExchange}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ExchangeCurrency;
