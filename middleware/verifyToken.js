const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }
    req.user = decoded;
    return next();
  });
};
