import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <StyledTitle>Add new income!</StyledTitle>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income {
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
            color: green;
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;

        .incomes {
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

export default Income