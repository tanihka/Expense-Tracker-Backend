const User = require('../models/User'); // Import your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    // Parse user data from request body
    const { email, password } = req.body;

    // Check if the user already exists (optional)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({ email: email, password : hashPassword });

    // Save the user to the database
    await newUser.save();
    const savedUser = await User.findOne({ email: email });
    const token = jwt.sign({ userID: savedUser._id }, process.env.SECRETKEY, {
      expiresIn: '1h',
    });
console.log(token)

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.login =  async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ message: 'User not found' });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          // Create and send a JWT token
          const savedUser = await User.findOne({ email: email });
          const token = jwt.sign({ userID: savedUser._id }, process.env.SECRETKEY, {
            expiresIn: '1h',
          });
      console.log(token)
          res.status(200).json({ token });
        } catch (error) {
          console.error("Token verification error: ",error);
          res.status(500).json({ message: 'Server Error' });
        }
      };