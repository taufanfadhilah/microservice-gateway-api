const apiAdapter = require("../../apiAdapter");
const { SERVICE_PROPERTY_URL } = process.env;
const api = apiAdapter(SERVICE_PROPERTY_URL);

module.exports = async (req, res) => {
  try {
    const user = req.user.data;
    const house = await api.get("house", {
      params: { owner_id: user.id },
    });
    return res.json({
      success: true,
      message: "get detail",
      data: {
        ...user,
        house: house?.data?.data,
      },
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "Property Service unavailable",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
