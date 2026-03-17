import React from 'react'
import '../styles/Currency.css'
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_CURRENCY_API_URL;
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

function Currency() {
    const [amount, setAmount] = React.useState(0);
    const [fromCurrency, setFromCurrency] = React.useState("USD");
    const [toCurrency, setToCurrency] = React.useState("TRY");
    const [output, setOutput] = React.useState("");

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const exchange = async () => {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
        setOutput((response.data.data[toCurrency] * amount).toFixed(2));
    }

    return (
        <div className='currency-div'>
            <div className='title'>DÖVİZ KURU UYGULAMASI</div>
            <div className='currency-things'>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number" placeholder="Enter amount" className='amount' />

                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className='from-currency'>
                    <option>USD</option>
                    <option>TRY</option>
                    <option>EUR</option>
                </select>

                <FaArrowRightArrowLeft onClick={swapCurrencies} className='arrow-icon' />

                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className='to-currency'>
                    <option>TRY</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>

                <input value={output} type="number" className='output' readOnly />
            </div>
            <div>
                <button
                    onClick={exchange}
                    className='buton'>Çevir</button>
            </div>
        </div>
    )
}

export default Currency