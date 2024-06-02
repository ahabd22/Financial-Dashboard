import React, { useState, useEffect } from 'react';
import { fetchStockPrice } from '../../services/stockService';

const StockPrice = () => {
    const [stockSymbol, setStockSymbol] = useState('MSFT'); // Default to Microsoft
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStockPrice = async () => {
            try {
                const price = await fetchStockPrice(stockSymbol);
                setPrice(price);
            } catch (error) {
                setError('Failed to fetch stock price');
            }
        };
        getStockPrice();
    }, [stockSymbol]);

    return (
        <div>
            <h2>Stock Price for {stockSymbol}</h2>
            {error && <p>{error}</p>}
            {price ? <p>Latest Price: ${price}</p> : <p>Loading...</p>}
            <input
                type="text"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                placeholder="Enter Stock Symbol"
            />
        </div>
    );
};

export default StockPrice;