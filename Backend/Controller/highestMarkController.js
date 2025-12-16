const { highestMarkModel } = require("../Models/highestMarkModel");

const highestMarkController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const data = await highestMarkModel(email);

    return res.status(200).json({
      success: true,
      message: "Student data fetched successfully",
      data,
    });

  } catch (err) {
    console.error("Failure Controller Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { highestMarkController };
