import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const { title, amount, date, isRecurring, tags } = req.body;

      const expenseModel = new ExpenseModel(
        title,
        amount,
        date,
        isRecurring,
        tags
      );

      await this.expenseRepository.addExpense(expenseModel);

      // console.log(result);
      res.status(201).send(expenseModel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const id = req.params.id;
      const expense = await this.expenseRepository.getOne(id);

      if (!expense) {
        res.status(404).json({ error: "Expense not found" });
        return;
      }
      res.status(200).send(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      res.status(200).send(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const id = req.params.id;
      const tag = req.body.tag;
      await this.expenseRepository.addTagToExpense(id, tag);
      const expense = await this.expenseRepository.getOne(id);
      // console.log(expense);

      res.status(200).send(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const criteria = req.query;
      const filteredExpenses = await this.expenseRepository.filterExpenses(
        criteria
      );

      res.status(200).send(filteredExpenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
