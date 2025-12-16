const pool = require('../Config/db');

const subjectModel = async (class_id) => {
  const query = `
    SELECT public.subject.*
    FROM public.class_subject
    LEFT JOIN public.subject
      ON public.class_subject.subject_id = public.subject.subject_id
    WHERE public.class_subject.class_id = $1;
  `;

  const result = await pool.query(query, [class_id]);
  return result.rows;
};

module.exports = {
  subjectModel,
};
