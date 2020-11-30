const apiAdapter = require("../../apiAdapter");
const {
  SERVICE_USER_URL,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;
const api = apiAdapter(SERVICE_USER_URL);
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    let user = await api.post("/users/login", req.body);
    user = user.data.data;
    user.token = jwt.sign({ data: user }, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    return res.json({
      success: true,
      message: "login success",
      data: user,
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "User service unavailable",
        data: null,
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
