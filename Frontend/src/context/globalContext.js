import React, { useContext, useState, useEffect, useCallback } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const fetchData = useCallback(async (url, setStateFunc) => {
        try {
            const response = await axios.get(url)
            setStateFunc(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }, [])

    const getIncomes = useCallback(() => fetchData(`${BASE_URL}get-incomes`, setIncomes), [fetchData])
    const getExpenses = useCallback(() => fetchData(`${BASE_URL}get-expenses`, setExpenses), [fetchData])

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [getIncomes, getExpenses])

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income)
            getIncomes()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`)
            getIncomes()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    const totalIncome = useCallback(() => {
        return incomes.reduce((total, income) => total + Number(income.amount), 0);
    }, [incomes])

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense)
            getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`)
            getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    const totalExpenses = useCallback(() => {
        return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    }, [expenses])

    const totalBalance = useCallback(() => {
        return totalIncome() - totalExpenses()
    }, [totalIncome, totalExpenses])

    const transactionHistory = useCallback(() => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => new Date(b.date) - new Date(a.date))
        return history.slice(0, 3)
    }, [incomes, expenses])

    const getStockData = async (symbol) => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=LKYKNZ4M7BT7S2GC`);
            const timeSeriesData = response.data['Time Series (Daily)'];
            const formattedData = Object.entries(timeSeriesData)
                .map(([date, values]) => ({
                    date,
                    close: parseFloat(values['4. close'])
                }))
                .slice(0, 30);

            return formattedData;
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setError('Error fetching stock data')
        }
    };

    return (
        <GlobalContext.Provider value={{
            getStockData,
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}