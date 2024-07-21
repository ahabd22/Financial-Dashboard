import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useGlobalContext} from '../../context/globalContext'
import {InnerLayout} from '../../styles/Layouts'
import Chart from 'react-apexcharts'
import Button from '../Button/Button'

function StockData() {
    const { getStockData } = useGlobalContext()
    const [stockData, setStockData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [ticker, setTicker] = useState('IBM')

    const fetchStockData = async () => {
        setIsLoading(true)
        const data = await getStockData(ticker)
        if (data) {
            setStockData(data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchStockData()
    }, [ticker])

    const handleTickerChange = (e) => {
        setTicker(e.target.value)
    }

    const chartData = stockData.length > 0 ? {
        options: {
            chart: {
                id: 'stock-data'
            },
            xaxis: {
                categories: stockData.map(item => item.date).reverse(),
                labels: {
                    rotate: -45,
                    rotateAlways: true
                }
            }
        },
        series: [{
            name: 'Close Price',
            data: stockData.map(item => item.close).reverse()
        }]
    } : null;


    return (
        <StockDataStyled>
            <InnerLayout>
                <StyledTitle>Stock Chart</StyledTitle>
                <div className="stock-content">
                    <div className="ticker-select">
                        <label htmlFor="ticker">Select Stock Ticker: </label>
                        <select id="ticker" value={ticker} onChange={handleTickerChange}>
                            <option value="IBM">IBM</option>
                            <option value="AAPL">Apple</option>
                            <option value="GOOGL">Google</option>
                            <option value="MSFT">Microsoft</option>
                            <option value="AMZN">Amazon</option>
                        </select>
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : stockData.length > 0 ? (
                        <div className="chart-con">
                            <Chart
                                options={chartData.options}
                                series={chartData.series}
                                type="line"
                                height={400}
                            />
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                    <div className="refresh-btn">
                        <Button
                            name={'Refresh Data'}
                            bPad={'.8rem 1.6rem'}
                            bRad={'30px'}
                            bg={'var(--color-accent'}
                            color={'#fff'}
                            onClick={fetchStockData}
                        />
                    </div>
                </div>
            </InnerLayout>
        </StockDataStyled>
    )
}

const StockDataStyled = styled.div`
    .stock-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .chart-con {
        height: 400px;
    }
    .ticker-select {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    select {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid;
        color: navy;
    }
    .refresh-btn button {
        background: #3498db !important;
        color: white;

        &:hover {
            background: #2980b9 !important;
        }
    }
    
`

const StyledTitle = styled.h1`
    color: #2c3e50;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid #2c3e50;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 3px;
        background-color: #2c3e50;
    }
`;

export default StockData