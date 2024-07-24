import {expenses, home, trend} from "./Icons";

export const menuItems = [
    {
        id: 1,
        title: 'Overblik',
        icon: home,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Indkomster",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Udgifter",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: 'Børs',
        icon: trend,
        link: '/stock-data'
    }
]