import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const {transactionHistory} = useGlobalContext()
    const [...history] = transactionHistory()
    
    return (
        <HistoryStyled>
            <h2 className = "recent-history"><span>Recent Transactions</span></h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'var(--color-delete)' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>
                        <p style={{
                            color: type === 'expense' ? 'var(--color-delete)' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount}` : `+${amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
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
        box-shadow: 0px 1px 15px rgba(52, 73, 94, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
            border-color: #34495e; // Dark blue border on hover
        }
    }
`;

export default History