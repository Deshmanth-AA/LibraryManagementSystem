const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  addUser
} = require('../controllers/userController');

router.get('/', protect, checkRole(['admin']), getAllUsers);
router.post('/', protect, checkRole(['admin']), addUser);
router.put('/:id/role', protect, checkRole(['admin']), updateUserRole);
router.delete('/:id', protect, checkRole(['admin']), deleteUser);

module.exports = router;