const pool = require("../Config/db");

const selectGenderModel = async (email) => {
    const result = await pool.query("SELECT * FROM gender" );
    return result.rows;
}

module.exports = {
  selectGenderModel
};