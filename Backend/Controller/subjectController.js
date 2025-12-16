const { subjectModel } = require('../Models/subjectModel');

const subjectController = async (req, res) => {
  try {
    const { class_id } = req.body;          // body se class_id nikaalo

    console.log("Requested Class ID:", class_id);
    console.log("Full body:", req.body);

    if (!class_id) {
      return res.status(400).json({ message: "Please select class" });
    }

    // yahan sirf class_id bhejo, poora body nahi
    const subject = await subjectModel(class_id);

    return res.status(200).json({ message: "Fetched Subject", subject });
  } catch (err) {
    console.error("Error in subjectController:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  subjectController,
};
