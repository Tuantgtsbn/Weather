import { useEffect, useMemo, useState, React, useRef } from 'react';
import GoldImage from '../../assets/images/gold.png';
import MoneyImage from '../../assets/images/money.png';
import Exchange from '../../assets/images/exchange.png';
import classNames from 'classnames';
import styles from './Currency.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import axiosCurrency from '../../api/axiosCurrency';
import axiosGold from '../../api/axiosGold';
// import Table from '../../components/Currency/Table/Table';
import { formatBigNumber } from '../../utils/formatNumber';
import ExchangeCurrency from '../../components/Currency/ExchangeCurrency/ExchangeCurrency';
const parseDataGold = (data) => {
    console.log('data in function parse', data);
    const newArr = [];
    data.map((item) => {
        const obj = {};
        if (item.brand === 'SJC') {
            obj.brand = 'SJC';
            obj.data = [];
            obj.lastUpdated = item.data[0].datetime;

            obj.data.push(
                {
                    name: 'Vàng 1 chỉ',
                    buy: item.data[0]?.buy_1c || 0,
                    sell: item.data[0]?.sell_1c || 0
                },
                {
                    name: 'Vàng 1 lượng',
                    buy: item.data[0]?.buy_1l || 0,
                    sell: item.data[0]?.sell_1l || 0
                },
                {
                    name: 'Vàng 5 chỉ',
                    buy: item.data[0]?.buy_5c || 0,
                    sell: item.data[0]?.sell_5c || 0
                },
                {
                    name: 'Vàng nữ trang 75',
                    buy: item.data[0]?.buy_nutrang_75 || 0,
                    sell: item.data[0]?.sell_nutrang_75 || 0
                },
                {
                    name: 'Vàng nữ trang 99',
                    buy: item.data[0]?.buy_nutrang_99 || 0,
                    sell: item.data[0]?.sell_nutrang_99 || 0
                },
                {
                    name: 'Vàng nữ trang 9999',
                    buy: item.data[0]?.buy_nutrang_9999 || 0,
                    sell: item.data[0]?.sell_nutrang_9999 || 0
                }
            );
        } else if (item.brand === 'PNJ') {
            obj.brand = 'PNJ';
            obj.lastUpdated = item.data[0].datetime;
            obj.data = [];

            obj.data.push(
                {
                    name: 'Nhẫn 24k',
                    buy: item.data[0]?.buy_nhan_24k || 0,
                    sell: item.data[0]?.sell_nhan_24k || 0
                },
                {
                    name: 'Nhẫn 10K',
                    buy: item.data[0]?.buy_nt_10k || 0,
                    sell: item.data[0]?.sell_nt_10k || 0
                },
                {
                    name: 'Nhẫn 14k',
                    buy: item.data[0]?.buy_nt_14k || 0,
                    sell: item.data[0]?.sell_nt_14k || 0
                },
                {
                    name: 'Nhẫn 18K',
                    buy: item.data[0]?.buy_nt_18k || 0,
                    sell: item.data[0]?.sell_nt_18k || 0
                },
                {
                    name: 'Nhẫn 24k',
                    buy: item.data[0]?.buy_nt_24k || 0,
                    sell: item.data[0]?.sell_nt_24k || 0
                }
            );
        } else if (item.brand === 'DOJI') {
            obj.brand = 'DOJI';
            obj.lastUpdated = item.data[0].datetime;
            obj.data = [];

            obj.data.push(
                {
                    name: 'Hà Nội',
                    buy: item.data[0]?.buy_hn || 0,
                    sell: item.data[0]?.sell_hn || 0
                },
                {
                    name: 'Đà Nẵng',
                    buy: item.data[0]?.buy_dn || 0,
                    sell: item.data[0]?.sell_dn || 0
                },
                {
                    name: 'Cần Thơ',
                    buy: item.data[0]?.buy_ct || 0,
                    sell: item.data[0]?.sell_ct || 0
                },
                {
                    name: 'Hồ Chí Minh',
                    buy: item.data[0]?.buy_hcm || 0,
                    sell: item.data[0]?.sell_hcm || 0
                }
            );
        }
        newArr.push(obj);
        console.log('newArr', newArr[0]);
    });
    return [...newArr];
};

const mapCodeToCountryName = (code) => {
    switch (code) {
        case 'USD':
            return 'Mỹ';
        case 'EUR':
            return 'Châu Âu';
        case 'JPY':
            return 'Nhật Bản';
        case 'AUD':
            return 'Australia';
        case 'CAD':
            return 'Canada';
        case 'CHF':
            return 'Thụy Sĩ';
        case 'CNY':
            return 'Trung Quốc';
        case 'HKD':
            return 'Hồng Kông';
        case 'DKK':
            return 'Đan Mạch';
        case 'GBP':
            return 'Anh';
        case 'INR':
            return 'Ấn Độ';
        case 'KRW':
            return 'Hàn Quốc';
        case 'MYR':
            return 'Malaysia';
        case 'NOK':
            return 'Na Uy';
        case 'NZD':
            return 'New Zealand';
        case 'PHP':
            return 'Philippines';
        case 'RUB':
            return 'Nga';
        case 'SEK':
            return 'Thụy Điển';
        case 'SGD':
            return 'Singapore';
        case 'KWD':
            return 'Kuwait';
        case 'TBH':
            return 'Thái Lan';
        case 'SAR':
            return 'Ả rập Xê-út';
        default:
            return 'Không rõ';
    }
};
const parseDataCurrency = (data) => {
    const newArr = [];
    data.map((item) => {
        const obj = {};
        obj.brand = item.brand;
        obj.data = [];
        item.data.map((item) => {
            obj.data.push({
                currency: item.currency,
                buy: item.buy_cash,
                sell: item.sell,
                country: mapCodeToCountryName(item.currency),
                transfer: item.buy_transfer
            });
        });
        newArr.push(obj);
    });
    return [...newArr];
};
function Currency() {
    const [nowOfGold, setNowOfGold] = useState(new Date());
    const [nowOfCurrency, setNowOfCurrency] = useState(new Date());
    const [loadingGold, setLoadingGold] = useState(false);
    const [loadingCurrency, setLoadingCurrency] = useState(false);
    const dataGoldCopy = useRef([]);
    const dataCurrencyCopy = useRef([]);
    const listGoldBrand = useMemo(
        () => [
            {
                brand: 'SJC',
                path: 'sjc'
            },
            {
                brand: 'DOJI',
                path: 'doji'
            },
            {
                brand: 'PNJ',
                path: 'pnj'
            }
        ],
        []
    );
    const listCurrencyBrand = useMemo(
        () => [
            {
                brand: 'Vietcombank (VCB)',
                path: 'vcb'
            }
        ],
        []
    );

    const fetchGold = async () => {
        setLoadingGold(true);
        const tmp = [];
        try {
            // Sử dụng Promise.all thay vì forEach
            await Promise.all(
                listGoldBrand.map(async (item) => {
                    try {
                        const res = await axiosGold.get(`/${item.path}`);
                        tmp.push({
                            brand: item.brand,
                            data: res.data.results
                        });
                    } catch (error) {
                        console.log(
                            'Loi khi goi api gold cua ngan hang',
                            item.brand,
                            ':',
                            error.message
                        );
                    }
                })
            );
        } catch (error) {
            console.log('Loi khi goi du lieu gold');
        } finally {
            console.log('tmp', tmp);
            setLoadingGold(false);
            dataGoldCopy.current = parseDataGold(tmp);
        }
    };
    useEffect(() => {
        fetchGold();
        fetchCurrency();
    }, []);
    const fetchCurrency = async () => {
        setLoadingCurrency(true);
        const tmp = [];
        try {
            await Promise.all(
                listCurrencyBrand.map(async (item) => {
                    try {
                        const res = await axiosCurrency.get(`/${item.path}`);
                        tmp.push({
                            brand: item.brand,
                            data: res.data.results
                        });
                    } catch (error) {
                        console.log(
                            'Loi khi goi api Currency cua ngan hang',
                            item.brand,
                            ':',
                            error.message
                        );
                    }
                })
            );
        } catch (error) {
            console.log('Loi khi goi du lieu Currency');
        } finally {
            dataCurrencyCopy.current = parseDataCurrency(tmp);
            setLoadingCurrency(false);
        }
    };
    const onClickRefreshGold = () => {
        fetchGold();
        setNowOfGold(new Date());
    };
    const onClickRefreshCurrency = () => {
        fetchCurrency();
        setNowOfCurrency(new Date());
    };
    useEffect(() => {
        document.title = 'Tỷ giá tiền tệ';
    }, []);
    return (
        <>
            <div className={classNames(styles.heading)}>
                <h1 className='text-2xl font-bold'>Giá vàng</h1>
                <img src={GoldImage} alt='Gold' />
            </div>
            <div className={classNames(styles.flexRow)}>
                <p className={classNames(styles.time)}>
                    Cập nhật lúc: {nowOfGold.toLocaleString()}
                </p>
                <FontAwesomeIcon
                    onClick={onClickRefreshGold}
                    icon={faRotateRight}
                    width={20}
                    height={20}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className={classNames(styles.tableContainer)}>
                <table className={classNames(styles.table)}>
                    <thead>
                        <tr>
                            <th>Doanh nghiệp</th>
                            <th>Sản phẩm</th>
                            <th>Mua vào</th>
                            <th>Bán ra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataGoldCopy.current.length > 0 &&
                            dataGoldCopy.current.map((goldBrand, index) => (
                                <>
                                    <tr key={index}>
                                        <td
                                            rowSpan={goldBrand.data.length}
                                            style={{ verticalAlign: 'top' }}
                                        >
                                            <div className={styles.brandInfo}>
                                                <p className={styles.brandName}>
                                                    {goldBrand.brand}
                                                </p>
                                                <p className={styles.updateTime}>
                                                    Cập nhật lúc{' '}
                                                    {new Date(
                                                        Number(goldBrand.lastUpdated)
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </td>
                                        <td>{goldBrand.data[0]?.name || ''}</td>
                                        <td className={styles.buyValue}>
                                            {formatBigNumber(goldBrand.data[0]?.buy)}
                                        </td>
                                        <td className={styles.sellValue}>
                                            {formatBigNumber(goldBrand.data[0]?.sell)}
                                        </td>
                                    </tr>

                                    {goldBrand.data.slice(1).map((gold, idx) => (
                                        <tr key={`${index}-${idx}`}>
                                            <td>{gold.name}</td>
                                            <td className={styles.buyValue}>
                                                {formatBigNumber(gold.buy)}
                                            </td>
                                            <td className={styles.sellValue}>
                                                {formatBigNumber(gold.sell)}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                    </tbody>
                </table>
                {loadingGold && (
                    <div className={classNames(styles.loading)}>
                        <div className={classNames(styles.loader)}></div>
                    </div>
                )}
            </div>

            <div className={classNames(styles.heading)}>
                <h1 className='text-2xl font-bold'>Tỷ giá tiền tệ</h1>
                <img src={MoneyImage} alt='Money' />
            </div>
            <div className={classNames(styles.flexRow)}>
                <p className={classNames(styles.time)}>
                    Cập nhật lúc: {nowOfGold.toLocaleString()}
                </p>
                <FontAwesomeIcon
                    onClick={onClickRefreshCurrency}
                    icon={faRotateRight}
                    width={20}
                    height={20}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className={classNames(styles.tableContainer)}>
                <table className={classNames(styles.table)}>
                    <thead>
                        <tr>
                            <th>Doanh nghiệp</th>
                            <th>Tiền tệ</th>
                            <th>Mua vào</th>
                            <th>Bán ra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCurrencyCopy.current.length > 0 &&
                            dataCurrencyCopy.current.map((currencyBrand, index) => (
                                <>
                                    <tr key={index}>
                                        <td
                                            rowSpan={currencyBrand.data.length}
                                            style={{ verticalAlign: 'top' }}
                                        >
                                            <div className={styles.brandInfo}>
                                                <p className={styles.brandName}>
                                                    {currencyBrand.brand}
                                                </p>
                                                <p className={styles.updateTime}>
                                                    Cập nhật lúc {new Date().toLocaleString()}
                                                </p>
                                            </div>
                                        </td>
                                        <td>{currencyBrand.data[0]?.currency || ''}</td>
                                        <td className={styles.buyValue}>
                                            {formatBigNumber(currencyBrand.data[0]?.buy)}
                                        </td>
                                        <td className={styles.sellValue}>
                                            {formatBigNumber(currencyBrand.data[0]?.sell)}
                                        </td>
                                    </tr>

                                    {currencyBrand.data.slice(1).map((currency, idx) => (
                                        <tr key={`${index}-${idx}`}>
                                            <td>{currency.currency}</td>
                                            <td className={styles.buyValue}>
                                                {formatBigNumber(currency.buy)}
                                            </td>
                                            <td className={styles.sellValue}>
                                                {formatBigNumber(currency.sell)}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                    </tbody>
                </table>
                {loadingCurrency && (
                    <div className={classNames(styles.loading)}>
                        <div className={classNames(styles.loader)}></div>
                    </div>
                )}
            </div>

            <div>
                {dataCurrencyCopy.current.length > 0 && (
                    <>
                        <div className={classNames(styles.heading)}>
                            <h1 className='text-2xl font-bold'>Quy đổi tiền tệ</h1>
                            <img src={Exchange} alt='Exchange' />
                        </div>
                        <ExchangeCurrency
                            data={[
                                ...dataCurrencyCopy.current[0].data,
                                {
                                    currency: 'VND',
                                    buy: 1,
                                    sell: 1,
                                    country: 'Việt Nam',
                                    transfer: 1
                                }
                            ]}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default Currency;
