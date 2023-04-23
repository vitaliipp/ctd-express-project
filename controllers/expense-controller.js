const Expense = require('../models/Expense');
const parse_v = require('../util/parse_v_error');

const status_values = Expense.schema.path('status').enumValues;

const expenses = async (req, res) => {
  const expenselist = await Expense.find({ createdBy: req.user.id });
  res.render('pages/expenses', {
    expenses: expenselist,
    errors: req.flash('error'),
    info: req.flash('info'),
  });
};

const new_expense = (req, res) => {
  const expense_values = {
    company: '',
    position: '',
    status: '',
    action: '/expenses/add',
    submit: 'Add',
    title: 'Add an Expense',
  };
  res.render('pages/expense', {
    status_values,
    expense_values,
    errors: req.flash('error'),
    info: req.flash('info'),
  });
};

const add_expense = async (req, res, next) => {
  try {
    await Expense.create({
      company: req.body.company,
      position: req.body.position,
      status: req.body.status,
      createdBy: req.user.id,
    });
  } catch (e) {
    if (e.name === 'ValidationError') {
      parse_v(e, req);
      const expense_values = {
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
        action: '/expenses/add',
        submit: 'Add',
        title: 'Add a Expense Entry',
      };
      return res.render('pages/expense', {
        status_values,
        expense_values,
        errors: req.flash('error'),
        info: req.flash('info'),
      });
    } else {
      return next(e);
    }
  }
  req.flash('info', 'The expense entry was added.');
  res.redirect('/expenses');
};

const edit_expense = async (req, res) => {
  const this_expense = await Expense.findOne({
    _id: req.params.expense,
    createdBy: req.user.id,
  });
  if (!this_expense) {
    req.flash('error', 'That expense was not found.');
    return res.redirect('/expenses');
  }
  const expense_values = {};
  expense_values.company = this_expense.company || '';
  expense_values.position = this_expense.position || '';
  expense_values.status = this_expense.status || '';
  expense_values.action = `/expenses/update/${this_expense._id}`;
  expense_values.submit = 'Update';
  expense_values.title = 'Edit an Expense Entry';
  res.render('pages/expense', {
    status_values,
    expense_values,
    errors: req.flash('error'),
    info: req.flash('info'),
  });
};

const update_expense = async (req, res, next) => {
  let this_expense = null;
  try {
    this_expense = await Expense.findOneAndUpdate(
      { _id: req.params.expense, createdBy: req.user.id },
      req.body,
      { runValidators: true }
    );
  } catch (e) {
    if (e.name === 'ValidationError') {
      parse_v(e, req);
      const expense_values = {};
      expense_values.company = req.body.company;
      expense_values.position = req.body.position;
      expense_values.status = req.body.status;
      expense_values.action = `/expenses/update/${req.params.expense}`;
      expense_values.submit = 'Update';
      expense_values.title = 'Edit an Expense Entry';
      return res.render('pages/expense', {
        status_values,
        expense_values,
        errors: req.flash('error'),
        info: req.flash('info'),
      });
    } else {
      return next(e);
    }
  }
  if (this_expense) {
    req.flash('info', 'The expense entry was updated.');
  } else {
    req.flash('error', 'The expense entry was not found.');
  }
  res.redirect('/expenses');
};

const delete_expense = async (req, res, next) => {
  const this_expense = await Expense.findOneAndDelete({
    _id: req.params.expense,
    createdBy: req.user.id,
  });
  if (!this_expense) {
    req.flash('error', 'The expense entry was not found.');
  } else {
    req.flash('info', 'The expense entry was deleted.');
  }
  res.redirect('/expenses');
};

module.exports = {
  expenses,
  add_expense,
  new_expense,
  edit_expense,
  update_expense,
  delete_expense,
};
