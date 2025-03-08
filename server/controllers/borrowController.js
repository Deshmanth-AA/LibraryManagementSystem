
const Book = require('../models/book');
const Borrow = require('../models/Borrow');

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies === 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      dueDate,
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    if (borrow.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    const book = await Book.findById(borrow.book);
    book.availableCopies += 1;
    await book.save();

    borrow.returnDate = new Date();
    borrow.status = 'returned';
    await borrow.save();

    res.json(borrow);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { borrowBook, returnBook };