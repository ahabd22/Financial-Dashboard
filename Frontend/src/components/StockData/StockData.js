import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import Chart from 'react-apexcharts'
import Button from '../Button/Button'

function StockData() {
    const { getStockData } = useGlobalContext()
    const [stockData, setStockData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchStockData = async () => {
        setIsLoading(true)
        const data = await getStockData()
        setStockData(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchStockData()
    }, [])

    const chartData = {
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
    };

    return (
        <StockDataStyled>
            <InnerLayout>
                <h1>Stock Data</h1>
                <div className="stock-content">
                    <div className="chart-con">
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type="line"
                            height={400}
                        />
                    </div>
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
                    {isLoading && <p>Loading...</p>}
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
`

export default StockData