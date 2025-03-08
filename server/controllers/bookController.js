
const Book = require('../models/book');

const addBook = async (req, res) => {
  try {
    const { title, author, isbn, genre, quantity } = req.body;
    const book = await Book.create({
      title,
      author,
      isbn,
      genre,
      quantity,
      availableCopies: quantity,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const searchBooks = async (req, res) => {
  try {
    const { searchBy, searchTerm } = req.query;

    if (!searchBy || !searchTerm) {
      return res.status(400).json({ message: 'searchBy and searchTerm are required' });
    }

    let exactMatchQuery = {};
    exactMatchQuery[searchBy] = searchTerm;

    let books = await Book.find(exactMatchQuery);

    if (books.length === 0) {
      let partialMatchQuery = {};
      partialMatchQuery[searchBy] = { $regex: searchTerm, $options: 'i' };
      books = await Book.find(partialMatchQuery);
    }

    res.json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { addBook, getBooks ,searchBooks};