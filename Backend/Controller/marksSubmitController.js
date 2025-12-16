const { marksSubModel } = require("../Models/marksSubmitModel");

const marksSubmitController = async (req, res) => {
  try {
    const insertedRows = await marksSubModel(req.body);
    res
      .status(201)
      .json({ message: "Student marks added successfully.", data: insertedRows });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { marksSubmitController };
