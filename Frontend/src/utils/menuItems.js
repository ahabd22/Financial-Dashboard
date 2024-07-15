import {dashboard, expenses, transactions, trend, home} from "./Icons";

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: home,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Income",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Expense",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: 'Stock Data',
        icon: trend,
        link: '/stock-data'
    }
]