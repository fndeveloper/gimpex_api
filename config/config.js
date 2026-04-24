const SECRET_KEY = "my_secret_123";

// fake config data
const configData = {
  siteName: "Gimpex",
  apiVersion: "1.0",
  status: "active"
};

module.exports = (req, res) => {
  const key = req.headers["x-api-key"];

  if (key !== SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized"
    });
  }

  res.json({
    success: true,
    config: configData
  });
};