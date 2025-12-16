const pool = require('../Config/db');

const highestMarkModel = async (email) => {
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

  // 2) Top performers (> 80%)
  const TOPPER_THRESHOLD = 80;
  const topperStudents = studentSummaries.filter(
    (s) => s.percentage > TOPPER_THRESHOLD
  );
  const topPerformersCount = topperStudents.length;

  // 3) Topper rate (> 80%)
  const topperRate =
    totalStudents === 0
      ? 0
      : Number(((topPerformersCount / totalStudents) * 100).toFixed(2));

  // 4) Strongest marks by subject (subject-wise MAXIMUM percentage)
  const subjectMap = {}; // { subject_id: { maxPerc } }

  rows.forEach((row) => {
    const sub = row.subject_id;
    const scored = Number(row.scored_marks || 0);
    const max = Number(row.max_marks || 0);

    if (!subjectMap[sub]) {
      subjectMap[sub] = { maxPerc: null };
    }

    const perc = max === 0 ? 0 : (scored / max) * 100;

    if (subjectMap[sub].maxPerc === null || perc > subjectMap[sub].maxPerc) {
      subjectMap[sub].maxPerc = perc;
    }
  });

  const strongestBySubject = Object.entries(subjectMap).map(
    ([subject_id, v]) => ({
      subject_id,
      strongest_percentage: Number(v.maxPerc.toFixed(2)),
    })
  );

  // 5) Strongest marks by class (class-wise MAXIMUM overall percentage)
  const classMap = {}; // { class_id: [percentages...] }

  studentSummaries.forEach((s) => {
    const cls = s.class_id;
    if (!classMap[cls]) classMap[cls] = [];
    classMap[cls].push(s.percentage);
  });

  const strongestByClass = Object.entries(classMap).map(
    ([class_id, percs]) => ({
      class_id,
      strongest_percentage: Number(Math.max(...percs).toFixed(2)),
    })
  );

  // Final data - TOPPER VERSION
  return {
    students: studentSummaries,        // per-student summary
    topperStudents,                    // >80% list

    totalStudents,                     // 1) TOTAL STUDENTS
    topPerformersCount,                // 2) COUNT >80%
    topperRate,                        // 2) RATE % >80%

    strongestBySubject,                // 3) STRONGEST BY SUBJECT
    strongestByClass,                  // 4) STRONGEST BY CLASS
  };
};

module.exports = { highestMarkModel };