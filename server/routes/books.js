const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
    addBook,
    getBooks,
    searchBooks,
  } = require('../controllers/bookController');


router.get('/', protect, checkRole(['admin','user']), getBooks);
router.post('/', protect, checkRole(['admin']), addBook);
router.get('/search', protect, checkRole(['user']), searchBooks);

module.exports = router;
