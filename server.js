const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/TransactionRoute')
const dotenv = require('dotenv');

const app = express();

dotenv.config()
// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
console.log('connected db')
// Define routes
app.use(route);
const userRoutes = require('./routes/auth'); // Import your user routes
app.use('/api', userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
