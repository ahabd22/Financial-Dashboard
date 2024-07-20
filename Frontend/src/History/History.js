import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext()
    const [history, setHistory] = React.useState([])
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await transactionHistory()
                setHistory(data)
            } catch (err) {
                setError('Failed to fetch transaction history')
                console.error(err)
            }
        }
        fetchHistory()
    }, [transactionHistory])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <HistoryStyled>
            <h2 className="recent-history"><span>Recent Transactions</span></h2>
            {history.map((item) => {
                const { id, title, amount, type } = item
                return (
                    <div key={id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'var(--color-delete)' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>
                        <p style={{
                            color: type === 'expense' ? 'var(--color-delete)' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense'
                                    ? `-${Number(amount).toFixed(2)}`
                                    : `+${Number(amount).toFixed(2)}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    // ... (styled component code remains unchanged)
`;

export default History