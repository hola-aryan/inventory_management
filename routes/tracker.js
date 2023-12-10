const path = require('path');

const express = require('express');

const stockTracker = require('../controllers/stockTracker');

const router = express.Router();


// Route for fetching expense
// router.get('/expense', expenseController.getExpenses);

// Route for adding a new expense
router.post('/Expense/add-Expense', stockTracker.postAddExpense);

//  Route to get all the Expenses
// router.get('/Expense/get-Expense', expenseController.getExpenses);


// router.delete('/Expense/delete-Expense/:id', expenseController.deleteExpenses);

// // Route for editing an existing expense
// router.post('/edit-Expense', expenseController.postEditExpense);

// // Route for deleting an expense
// router.post('/delete-item', expenseController.postCartDeleteExpense);

module.exports = router;