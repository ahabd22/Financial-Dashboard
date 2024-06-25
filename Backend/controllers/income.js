const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    if (amount <= 0 || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const income = new IncomeSchema({ title, amount, category, description, date });

    try {
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(income);
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
