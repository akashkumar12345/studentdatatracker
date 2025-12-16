const { searchModel } = require('../Models/searchModel');

const searchController = async (req, res) => {
  try {
    const { email, enroll_id } = req.body;

    // Validate input presence
    if (!email || !enroll_id) {
      return res.status(400).json({
        error: !email
          ? "Email not found. Please re-login."
          : "Please provide enroll ID."
      });
    }

    // Call model to search
    const searched = await searchModel(email, enroll_id);

    // Log student data for debugging (optional - remove in production)
    if (searched && searched.length > 0) {
      searched.forEach(student => {
        console.log("student data here", student);
      });
    }

    // Check results and respond accordingly
    if (searched && searched.length > 0) {
      return res.status(200).json({ 
        message: 'Student details found', 
        data: searched 
      });
    } else {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error in searchController:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

module.exports = {
  searchController
};
