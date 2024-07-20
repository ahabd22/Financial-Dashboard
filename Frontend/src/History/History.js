import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext()

    const history = useMemo(() => {
        const transactions = transactionHistory()
        return transactions.slice(0, 5) // Get only the 5 most recent transactions
    }, [transactionHistory])

    if (history.length === 0) {
        return (
            <HistoryStyled>
                <h2 className="recent-history"><span>Recent Transactions</span></h2>
                <p>No recent transactions</p>
            </HistoryStyled>
        )
    }

    return (
        <HistoryStyled>
            <h2 className="recent-history"><span>Recent Transactions</span></h2>
            {history.map((item) => {
                const {id, _id, title, amount, type} = item
                return (
                    <div key={id || _id} className="history-item">
                        <p className={`title ${type}`}>
                            {title}
                        </p>
                        <p className={`amount ${type}`}>
                            {type === 'expense' ? '-' : '+'}${Math.abs(Number(amount)).toFixed(2)}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

History.propTypes = {
    transactionHistory: PropTypes.func.isRequired,
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .recent-history {
        color: #2c3e50; // Dark blue color for the heading
    }

    .history-item {
        background: white;
        border: 2px solid #ecf0f1; // Light border
        box-shadow: 0 1px 15px rgba(52, 73, 94, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
            border-color: #34495e; // Dark blue border on hover
        }

        .title {
            font-weight: 5000;
        }

        .amount {
            font-weight: 6000;
        }

        .expense {
            color: red;
        }

        .income {
            color: green;
        }
    }
`;

export default History