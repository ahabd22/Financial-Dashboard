import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext()
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                await getExpenses()
            } catch (err) {
                setError('Failed to fetch expenses')
            }
        }
        fetchExpenses()
    }, [getExpenses])

    const sortedExpenses = useMemo(() => {
        return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
    }, [expenses])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <ExpenseStyled>
            <InnerLayout>
                <StyledTitle>Add new Expense :(</StyledTitle>
                <h2 className="total-expense">Total Expense: <span>${totalExpenses().toFixed(2)}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {sortedExpenses.map((expense) => {
                            const { id, _id, title, amount, date, category, description, type } = expense;
                            return <IncomeItem
                                key={id || _id}
                                id={id || _id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-red)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border: 2px solid #34495e;
        box-shadow: 0px 1px 15px rgba(52, 73, 94, 0.1);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: red;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
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

export default Expenses