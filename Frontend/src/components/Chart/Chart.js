import React, { useMemo } from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    const data = useMemo(() => {
        const incomesDates = incomes.map(inc => dateFormat(inc.date))
        const expensesDates = expenses.map(exp => dateFormat(exp.date))
        const allDates = [...new Set([...incomesDates, ...expensesDates])].sort((a, b) => new Date(a) - new Date(b))

        return {
            labels: allDates,
            datasets: [
                {
                    label: 'Income',
                    data: allDates.map(date => {
                        const income = incomes.find(inc => dateFormat(inc.date) === date)
                        return income ? Number(income.amount) : 0
                    }),
                    backgroundColor: 'green',
                    borderColor: 'green',
                    tension: .2
                },
                {
                    label: 'Expense',
                    data: allDates.map(date => {
                        const expense = expenses.find(exp => dateFormat(exp.date) === date)
                        return expense ? Number(expense.amount) : 0
                    }),
                    backgroundColor: 'red',
                    borderColor: 'red',
                    tension: .2
                }
            ]
        }
    }, [incomes, expenses])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    if (incomes.length === 0 && expenses.length === 0) {
        return (
            <ChartStyled>
                <ChartTitle>No data available</ChartTitle>
            </ChartStyled>
        )
    }

    return (
        <ChartStyled>
            <ChartTitle>Finances over Time</ChartTitle>
            <ChartContainer>
                <Line data={data} options={options} />
            </ChartContainer>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: white;
    border: 2px solid #34495e;
    box-shadow: 0px 1px 15px rgba(52, 73, 94, 0.1);
    padding: 1rem;
    border-radius: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

const ChartTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
    flex: 1;
    position: relative;
`;

export default Chart