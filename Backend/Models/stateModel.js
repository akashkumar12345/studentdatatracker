const pool = require("../Config/db")

const stateModel = async() => {
    const result = await pool.query(
        "SELECT * FROM states_union_territories"
    )
    return result.rows
}
module.exports = {
    stateModel,
}