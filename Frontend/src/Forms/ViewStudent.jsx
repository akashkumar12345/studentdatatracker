import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import StudyTable from "../FormComponent/Table";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import StudentLoader from "../StudentLoader"; // ✅ path adjust karo

const tableColumns = [
  { id: "enroll_id", label: "Enroll ID" },
  { id: "firstname", label: "First Name" },
  { id: "lastname", label: "Last Name" },
  { id: "address", label: "Address" },
  { id: "nationality", label: "Nationality" },
  { id: "parentname", label: "Parent Name" },
];

export default function ViewStudent() {
  const token = Cookies.get("token");
  const [studentRows, setStudentRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const fromData = new FormData();
        fromData.append("email", jwtDecode(token).email);
        const res = await axios.post(
          "http://localhost:5000/api/viewStudent",
          fromData
        );
        if (res.status === 200 && res.data.students) {
          setStudentRows(res.data.students);
          setShowTable(true);
        } else {
          setShowTable(false);
        }
      } catch (err) {
        setShowTable(false);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "50vh" }}>
      {/* ✅ Tea loader overlay */}
      {loading && <StudentLoader />}

      {showTable && !loading && (
        <StudyTable columns={tableColumns} rows={studentRows} />
      )}
    </Box>
  );
}
