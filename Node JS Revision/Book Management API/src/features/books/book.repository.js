import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";

const Book = mongoose.model("Book", bookSchema);

export default class BookRepository {
  // -----Change code in below functions only-----

  //book creation
  async createBook(bookData) {
    try {
      const book = new Book(bookData);
      const savedBook = await book.save();
      return savedBook;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //filtering the book by id
  async getOne(id) {
    try {
      const book = await Book.findById(id);
      return book;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
