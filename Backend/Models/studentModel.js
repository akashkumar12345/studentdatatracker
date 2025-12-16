const pool = require('../Config/db.js');

const addStudent = async (studentData) => {
  const { firstName, middleName, lastName, parentName, nationality, address, email, gender, parent_mobile_number, emergency_number, distt, date_of_birth, caste, previous_school, state } = studentData;

  // Get the current year
  const year = new Date().getFullYear();

  // Get the next value for your sequential number (e.g., using the current sequence for id)
  // You can use COUNT(*) + 1 for demonstration, but best is to use id after insert
  // Here we'll fetch the next id from sequence (better in PostgreSQL)
  const idResult = await pool.query(`SELECT nextval('addstudent_id_seq') AS next_id`);
  const nextId = idResult.rows[0].next_id;

  // Construct enroll_id with the desired format
  const enroll_id = `ENR-${year}-${nextId}`;

  // Now, insert the student row WITH enroll_id (using currval, after consuming nextval above)
  const result = await pool.query(
    `INSERT INTO addStudent 
      (id, firstName, middleName, lastName, parentName, nationality, address, email, enroll_id, gender, parent_mobile_number, emergency_number, distt, date_of_birth, caste, previous_school, state)
      VALUES (currval('addstudent_id_seq'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
    [firstName, middleName, lastName, parentName, nationality, address, email, enroll_id, gender, parent_mobile_number, emergency_number, distt, date_of_birth, caste, previous_school, state]
  );

  return result.rows[0];
};

module.exports = {
  addStudent,
};
