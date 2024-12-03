const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "Please provide Email & Password" });
  }
  try {
    const user = await User.create({
      username,
      email,
      password,
      confirmPassword
    });
    res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !email || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
      expiresIn: "2d"
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { registerUser, loginUser };
