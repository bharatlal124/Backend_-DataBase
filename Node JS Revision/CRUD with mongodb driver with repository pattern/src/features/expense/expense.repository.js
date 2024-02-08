import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses";
  }

  // Create a new expense
  async addExpense(expense) {
    const db = getDB();

    await db.collection(this.collectionName).insertOne(expense);
    // console.log(result);
    return expense;
  }

  // Get one expnese by its ID
  async getOne(id) {
    const db = getDB();

    const result = await db
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(id) });
    return result;
  }

  // Get all expenses
  async getAllExpenses() {
    const db = getDB();

    const result = await db.collection(this.collectionName).find().toArray();
    // console.log(result);
    return result;
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    const db = getDB();

    const result = await db
      .collection(this.collectionName)
      .updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } });

    return result;

    // console.log("Added Tag: ", result);
    // return result.modifiedCount > 0 ? { success: true } : { success: false };
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try {
      const db = getDB();

      const { minAmount, maxAmount, isRecurring } = criteria;

      const filter = {};

      if (minAmount !== undefined) {
        filter.amount = { $gte: parseInt(minAmount) };
      }

      if (maxAmount !== undefined) {
        filter.amount = { ...filter.amount, $lte: parseInt(maxAmount) };
      }

      if (isRecurring !== undefined) {
        filter.isRecurring = isRecurring === "true";
      }
      return await db.collection(this.collectionName).find(filter).toArray();
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }
}

export default ExpenseRepository;
