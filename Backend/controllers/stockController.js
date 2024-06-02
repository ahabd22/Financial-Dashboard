const axios = require('axios');

const API_KEY = '90USAKN151HB6C7U.';
const BASE_URL = 'https://www.alphavantage.co/query';

exports.getStockPrice = async (req, res) => {
    const symbol = req.params.symbol;
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Extracting the latest stock price
        const timeSeries = data['Time Series (1min)'];
        const latestTime = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTime];
        const latestPrice = latestData['1. open'];

        res.json({ symbol, latestPrice });
    } catch (error) {
        console.error('Error fetching stock price:', error);
        res.status(500).json({ error: 'Error fetching stock price' });
    }
};