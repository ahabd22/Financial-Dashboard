import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useGlobalContext} from '../../context/globalContext';
import History from '../../History/History';
import {InnerLayout} from '../../styles/Layouts';
import {dollar} from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getIncomes()
                await getExpenses()
            } catch (err) {
                setError("Failed to fetch data. Please try again later.")
            }
        }
        fetchData()
    }, [])

    const getMinMaxAmount = (items) => {
        if (items.length === 0) return { min: 0, max: 0 }
        const amounts = items.map(item => item.amount)
        return {
            min: Math.min(...amounts),
            max: Math.max(...amounts)
        }
    }

    const { min: minIncome, max: maxIncome } = getMinMaxAmount(incomes)
    const { min: minExpense, max: maxExpense } = getMinMaxAmount(expenses)

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <DashboardStyled>
            <InnerLayout>
                <StyledTitle>Overblik</StyledTitle>
                <ContentWrapper>
                    <div className="stats-con">
                        <div className="chart-con">
                            <Chart />
                        </div>
                        <div className="history-con">
                            <History />
                            <h2 className="salary-title">Mindste <span>Indkomst</span>Højeste</h2>
                            <div className="salary-item">
                                <p>${minIncome.toFixed(2)}</p>
                                <p>${maxIncome.toFixed(2)}</p>
                            </div>
                            <h2 className="salary-title">Mindste <span>Udgift</span>Højeste</h2>
                            <div className="salary-item">
                                <p>${minExpense.toFixed(2)}</p>
                                <p>${maxExpense.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
                <AmountContainer>
                    <div className="income">
                        <h2>Samlet Indkomst</h2>
                        <p>{dollar} {totalIncome().toFixed(2)}</p>
                    </div>
                    <div className="balance">
                        <h2>Saldo</h2>
                        <p style={{
                            color: totalBalance() < 0 ? 'var(--color-delete)' : 'var(--color-green)',
                            opacity: 1
                        }}>
                            {dollar} {totalBalance().toFixed(2)}
                        </p>
                    </div>
                    <div className="expense">
                        <h2>Samlede Udgifter</h2>
                        <p>{dollar} {totalExpenses().toFixed(2)}</p>
                    </div>
                </AmountContainer>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    position: relative;
    padding-bottom: 200px; // Add padding to make room for AmountContainer
`;

const ContentWrapper = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;
        }

        .history-con {
            grid-column: 4 / -1;
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title {
                font-size: 1.2rem;
                span {
                    font-size: 1.8rem;
                }
                color: #2c3e50;
            }
            .salary-item {
                background: white;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

const AmountContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 2rem;

    .income, .expense, .balance {
        flex: 1;
        background: white;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
        transition: transform 0.2s, box-shadow 0.2s;
        text-align: center;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.15);
        }

        h2 {
            margin-bottom: 0.5rem;
        }

        p {
            font-size: 2.5rem;
            font-weight: 700;
        }
    }

    .income p {
        color: green;
    }

    .expense p {
        color: red;
    }

    .balance {
        margin: 0 2rem;
    }
`;

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

export default Dashboard