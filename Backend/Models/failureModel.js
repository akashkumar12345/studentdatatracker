// const pool = require('../Config/db')

// const failureModel = async( email ) => {
//         const result = await pool.query(`SELECT * FROM student_record WHERE email = $1`,[email]);
//         console.log(result.rows);
//         return result.rows
        
// }

// module.exports = {
//     failureModel
// }

const pool = require("../Config/db");

const failureModel = async (email) => {
  const { rows } = await pool.query(
    `SELECT enroll_id, class_id, subject_id, scored_marks, max_marks
     FROM student_record
     WHERE email = $1`,
    [email]
  );

  // 1) Student-wise aggregation
  const students = {}; // { enroll_id: { totalScored, totalMax, class_id } }

  rows.forEach((row) => {
    const id = row.enroll_id;
    const scored = Number(row.scored_marks || 0);
    const max = Number(row.max_marks || 0);

    if (!students[id]) {
      students[id] = {
        totalScored: 0,
        totalMax: 0,
        class_id: row.class_id,
      };
    }

    students[id].totalScored += scored;
    students[id].totalMax += max;
  });

  // 2) Percentage per student
  const studentSummaries = Object.entries(students).map(([enroll_id, s]) => {
    const percentage =
      s.totalMax === 0 ? 0 : (s.totalScored / s.totalMax) * 100;

    return {
      enroll_id,
      class_id: s.class_id,
      total_scored: s.totalScored,
      total_max: s.totalMax,
      percentage: Number(percentage.toFixed(2)),
    };
  });

  const totalStudents = studentSummaries.length; // 1) TOTAL STUDENTS

  // 2) Low performers (< 40%)
  const LOW_THRESHOLD = 40;
  const lowPerformers = studentSummaries.filter(
    (s) => s.percentage < LOW_THRESHOLD
  );
  const lowPerformersCount = lowPerformers.length;

  // 3) Fail rate (< 30%)
  const FAIL_THRESHOLD = 30;
  const failedStudents = studentSummaries.filter(
    (s) => s.percentage < FAIL_THRESHOLD
  );
  const failedCount = failedStudents.length;
  const failRate =
    totalStudents === 0
      ? 0
      : Number(((failedCount / totalStudents) * 100).toFixed(2));

  // 4) Weakest marks by subject (subject-wise minimum percentage)
  const subjectMap = {}; // { subject_id: { scored, max } }

  rows.forEach((row) => {
    const sub = row.subject_id;
    const scored = Number(row.scored_marks || 0);
    const max = Number(row.max_marks || 0);

    if (!subjectMap[sub]) {
      subjectMap[sub] = { minPerc: null };
    }

    const perc = max === 0 ? 0 : (scored / max) * 100;

    if (subjectMap[sub].minPerc === null || perc < subjectMap[sub].minPerc) {
      subjectMap[sub].minPerc = perc;
    }
  });

  const weakestBySubject = Object.entries(subjectMap).map(
    ([subject_id, v]) => ({
      subject_id,
      weakest_percentage: Number(v.minPerc.toFixed(2)),
    })
  );

  // 5) Weakest marks by class (class-wise minimum overall percentage)
  const classMap = {}; // { class_id: [percentages...] }

  studentSummaries.forEach((s) => {
    const cls = s.class_id;
    if (!classMap[cls]) classMap[cls] = [];
    classMap[cls].push(s.percentage);
  });

  const weakestByClass = Object.entries(classMap).map(
    ([class_id, percs]) => ({
      class_id,
      weakest_percentage: Number(Math.min(...percs).toFixed(2)),
    })
  );

  // Final data
  return {
    // rawRows: rows,              // subject-wise rows
    students: studentSummaries, // per-student summary

    totalStudents,              // 1
    lowPerformers,              // 2 list
    lowPerformersCount,         // 2 count

    failedStudents,             // 3 list (<30)
    failedCount,                // 3 count
    failRate,                   // 3 %

    weakestBySubject,           // 4
    weakestByClass,             // 5
  };
};

module.exports = { failureModel };
