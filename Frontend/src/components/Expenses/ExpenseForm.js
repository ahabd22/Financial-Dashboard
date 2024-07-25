import React, {useState} from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {useGlobalContext} from '../../context/globalContext';
import Button from '../Button/Button';
import {plus} from '../../utils/Icons';

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
        if (!title || !amount || !date || !category || !description) {
            setError('All fields are required')
            return
        }
        if (isNaN(amount) || amount <= 0) {
            setError('Amount must be a positive number')
            return
        }
        const formattedDate = date instanceof Date ? date.toISOString().split('T')[0] : ''
        const expenseData = {
            ...inputState,
            amount: parseFloat(amount),
            date: formattedDate
        }
        addExpense(expenseData)
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
                    placeholder="Titel"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="number"
                    name={'amount'}
                    placeholder={'Udgiftsbeløb'}
                    onChange={handleInput('amount')}
                    step="0.01"
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Indtast En Dato'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Udgiftskilder</option>
                    <option value="education">Udannelse</option>
                    <option value="groceries">Indkøb</option>
                    <option value="health">Helbred</option>
                    <option value="subscriptions">Abonnementer</option>
                    <option value="takeaways">Takeaway</option>
                    <option value="clothing">Tøj</option>
                    <option value="travelling">Rejse</option>
                    <option value="other">Andet</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Beskrivelse' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Tilføj udgift'}
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

    .error {
        color: red;
        font-size: 0.8rem;
        margin-top: -1rem;
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