import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#3498db'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0px 1px 15px rgba(52, 73, 94, 0.1);

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: .8rem 1rem;
        border-radius: 5px;
        border: 2px solid #34495e;
        background: white;
        resize: none;
        color: #2c3e50;

        &::placeholder {
            color: #7f8c8d;
        }
    }
    

    .selects select {
        color: #7f8c8d;

        &:focus, &:active {
            color: #2c3e50;
        }
    }

    .submit-btn button {
        background: #3498db !important;
        color: white;

        &:hover {
            background: #2980b9 !important;
        }
    }
`;

export default ExpenseForm