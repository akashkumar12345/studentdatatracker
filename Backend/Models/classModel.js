const pool = require('../Config/db');
const classModel = async () =>{
    const result = await pool.query('SELECT * FROM public.class');
    return result.rows
}
module.exports = {
    classModel
}