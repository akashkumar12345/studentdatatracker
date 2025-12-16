const pool = require("../Config/db");

const viewStudent = async (email) => {
    const result = await pool.query(
        "SELECT * FROM addstudent WHERE email = $1",[email]
    );
    return result.rows;
};

module.exports = {
    viewStudent,
};
