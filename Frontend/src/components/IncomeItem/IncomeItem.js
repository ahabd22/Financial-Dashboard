import React from 'react'
import styled from 'styled-components'
import {dateFormat} from '../../utils/dateFormat';
import {
    bitcoin,
    book,
    calender,
    card,
    circle,
    clothing,
    comment,
    dollar,
    food,
    freelance,
    medical,
    money,
    piggy,
    stocks,
    takeaway,
    trash,
    tv,
    users,
    yt
} from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
                        id,
                        title,
                        amount,
                        date,
                        category,
                        description,
                        deleteItem,
                        indicatorColor,
                        type
                    }) {
    const categoryIcon = () => {
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {Number(amount).toFixed(2)}</p>
                        <p>{calender} {date ? dateFormat(date) : 'N/A'}</p>
                        <p>
                            {comment}
                            {description || 'No description'}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'#2c3e50'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'#34495e'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: white;
    border: 2px solid #34495e;
    box-shadow: 0px 1px 15px rgba(52, 73, 94, 0.1);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #2c3e50;

    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #ecf0f1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #34495e;
        i {
            font-size: 2.6rem;
            color: #2c3e50;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;

        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            color: #2c3e50;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #34495e;
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem