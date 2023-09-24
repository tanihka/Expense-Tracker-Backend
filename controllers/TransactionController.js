const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  const { text, amount } = req.body;

    // Access user information from req.user
    const { _id: userId } = req.user;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text field is required and cannot be empty." });
  }
  try {
    const newTransaction = new Transaction({ text, amount, userId });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
  const transactionId = req.params.id; // Use 'id' to access the parameter
  console.log('messageid:', transactionId);

  try {
    // Check if transactionId is undefined and handle it
    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is missing' });
    }

    // Continue with the delete operation
    await Transaction.findByIdAndDelete(transactionId);

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTransaction =  async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    // Find the transaction by ID
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Update transaction properties
    transaction.text = req.body.text || transaction.text;
    transaction.amount = req.body.amount || transaction.amount;

    // Save the updated transaction
    const updatedTransaction = await transaction.save();

    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};