const pool = require('../Config/db')
const searchModel = async(email,enroll_id) => {
    const result = await pool.query('SELECT * from addstudent WHERE email = $1 AND enroll_id = $2',[email,enroll_id]    )
    return result.rows
}
module.exports = {
    searchModel
}