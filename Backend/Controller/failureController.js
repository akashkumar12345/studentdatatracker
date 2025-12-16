const { failureModel } = require("../Models/failureModel");

const failureController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const data = await failureModel(email);

    return res.status(200).json({
      success: true,
      message: "Student data fetched successfully",
      data, // yahan already: totalStudents, lowPerformersCount, failRate, weakestBySubject, weakestByClass, etc.
    });
  } catch (err) {
    console.error("Failure Controller Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  failureController,
};
