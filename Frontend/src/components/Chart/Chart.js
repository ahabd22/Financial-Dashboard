import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
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
    const {incomes, expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expense',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };


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
    margin-top: 2rem; // Add margin to the top
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