const { viewStudent } = require('../Models/viewStudent');

const viewStudentforSearch = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: "Email and Enroll ID both are required" });
    }

    // Fetch from DB
    const students = await viewStudent(email);

    // Log found students
    students.forEach((student) => {
      console.log("Student email:", student.email);
    });

    if (students.length > 0) {
      return res.status(200).json({ message: 'Student Details here', students });
    } else {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  viewStudentforSearch
};
