const pool = require("../Config/db")

const casteModel = async () => {
    const result = await pool.query(
        "SELECT * FROM caste"
    ) 
    return result.rows
}

module.exports = {
    casteModel,
}