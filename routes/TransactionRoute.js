const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/TransactionController');
const userAuthMiddleware = require('../middleware/auth')

// router.post('/api/transactions', userAuthMiddleware);

// Get all transactions
router.get('/transactions', transactionsController.getTransactions);

// Add a new transaction
router.post('/transactions', userAuthMiddleware, transactionsController.addTransaction);

// Delete a transaction by ID
router.delete('/api/transactions/:id', transactionsController.deleteTransaction);
router.put('/api/transactions/:id', transactionsController.updateTransaction);


module.exports = router;
