const apiAdapter = require("../../apiAdapter");
const { SERVICE_USER_URL } = process.env;
const api = apiAdapter(SERVICE_USER_URL);

module.exports = async (req, res) => {
  try {
    let user = await api.post("/users/login", req.body);
    user = user.data.data;
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
