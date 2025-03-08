const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const Borrow = require('../models/Borrow');
const { borrowBook, returnBook } = require('../controllers/borrowController');


router.get('/active', protect, checkRole(['admin']), async (req, res) => {
  try {
    const borrows = await Borrow.find({ status: 'borrowed' })
      .populate('user', 'name email')
      .populate('book', 'title author');
    res.json(borrows);
  } catch (error) {
    console.error('Error fetching active borrows:', error);
    res.status(500).json({ message: 'Error fetching active borrows' });
  }
});
router.post('/', protect, checkRole(['user']), borrowBook);
router.put('/:borrowId/return', protect, checkRole(['user']), returnBook);
router.get('/history', protect, checkRole(['user']), async (req, res) => {
  try {
    const userId = req.user.id;
    const borrowHistory = await Borrow.find({ user: userId })
      .populate('book', 'title author') // Populate book details
      .sort({ issueDate: -1 });
    res.json(borrowHistory);
    } catch (error) {
      console.error('Error fetching borrow history:', error);
      res.status(500).json({ message: 'Error fetching borrow history' });
    }
});

module.exports = router;





