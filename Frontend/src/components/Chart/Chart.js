import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    const data = useMemo(() => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const groupByMonth = (transactions) => {
            return transactions.reduce((acc, transaction) => {
                const date = new Date(transaction.date)
                const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
                if (!acc[monthYear]) {
                    acc[monthYear] = 0
                }
                acc[monthYear] += Number(transaction.amount)
                return acc
            }, {})
        }

        const incomesByMonth = groupByMonth(incomes)
        const expensesByMonth = groupByMonth(expenses)

        const allMonths = [...new Set([...Object.keys(incomesByMonth), ...Object.keys(expensesByMonth)])].sort((a, b) => {
            const [aMonth, aYear] = a.split(' ')
            const [bMonth, bYear] = b.split(' ')
            return new Date(`${aMonth} 1, ${aYear}`) - new Date(`${bMonth} 1, ${bYear}`)
        })

        return {
            labels: allMonths,
            datasets: [
                {
                    label: 'Income',
                    data: allMonths.map(month => incomesByMonth[month] || 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expense',
                    data: allMonths.map(month => expensesByMonth[month] || 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        }
    }, [incomes, expenses])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount ($)'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Income and Expenses'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        }
    };

    if (!data || (incomes.length === 0 && expenses.length === 0)) {
        return (
            <ChartStyled>
                <NoDataMessage>No data available</NoDataMessage>
            </ChartStyled>
        )
    }

    return (
        <ChartStyled>
            <ChartContainer>
                <Bar data={data} options={options} />
            </ChartContainer>
        </ChartStyled>
    )
}

Chart.propTypes = {
    incomes: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })).isRequired,
}

const ChartStyled = styled.div`
    background: white;
    border: 2px solid #34495e;
    box-shadow: 0px 1px 15px rgba(52, 73, 94, 0.1);
    padding: 1rem;
    border-radius: 20px;
    height: 500px;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

const ChartContainer = styled.div`
    flex: 1;
    position: relative;
`;

const NoDataMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
    color: #34495e;
    margin-top: 2rem;
`;

export default Chart