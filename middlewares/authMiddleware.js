const jwt = require("jsonwebtoken");
const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("Invalid User...!!");
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ message: "Not authorized. No token found." });
  }
});

module.exports = protect;
