const apiAdapter = require("../../apiAdapter");
const { SERVICE_PROPERTY_URL } = process.env;
const api = apiAdapter(SERVICE_PROPERTY_URL);

module.exports = async (req, res) => {
  try {
    let house = await api.get("house");
    return res.json({
      success: true,
      message: "get all house",
      data: house.data.data,
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "service unavailable",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
