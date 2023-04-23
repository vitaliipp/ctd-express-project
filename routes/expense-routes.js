const express = require('express');

const {
  new_expense,
  add_expense,
  edit_expense,
  update_expense,
  expenses,
  delete_expense,
} = require('../controllers/expense-controller');

const router = express.Router();
router.route('/').get(expenses);
router.route('/add').get(new_expense).post(add_expense);
router.route('/edit/:expense').get(edit_expense);
router.route('/update/:expense').post(update_expense);
router.route('/delete/:expense').delete(delete_expense);

module.exports = router;
