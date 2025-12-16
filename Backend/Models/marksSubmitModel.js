const pool = require("../Config/db");

const marksSubModel = async (marksData) => {
    const { enroll_id, class_id, marks, email } = marksData;

    // 1) Pehle check karo ki is enroll_id ka data already hai ya nahi
    const check = await pool.query(
        `SELECT 1 FROM student_record WHERE enroll_id = $1 LIMIT 1`,
        [enroll_id]
    );

    if (check.rowCount > 0) {
        throw new Error("Data for this enroll_id already exists");
    }

    // 2) Agar nahi hai to ab insert karo
    const insertQuery = `
    INSERT INTO student_record 
      (enroll_id, class_id, subject_id, scored_marks, max_marks, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

    const results = [];

    for (const m of marks) {
        const { subject_id, scored_marks, max_marks } = m;
        const res = await pool.query(insertQuery, [
            enroll_id,
            class_id,
            subject_id,
            scored_marks,
            max_marks,
            email,
        ]);
        results.push(res.rows[0]);
    }

    return results;
};

module.exports = { marksSubModel };