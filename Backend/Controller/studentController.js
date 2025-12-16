const { addStudent } = require('../Models/studentModel');

const createStudent = async (req, res) => {
  try {
    const student = await addStudent(req.body);
    res.status(201).json({ message: 'Student added sucessfully', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStudent,
};
