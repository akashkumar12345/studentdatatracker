// MarksForm.jsx
import React, { useState, useEffect } from "react";
import "./MarksForm.css";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ConfirmDialog from "../FormComponent/ConfirmDialog";
import FancyAlert from "../FormComponent/FancyAlert";
import StudentLoader from "../StudentLoader";

const MarksForm = (props) => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [rows, setRows] = useState([
    { subject_id: "", scored_marks: "", max_marks: "" },
  ]);
  const token = Cookies.get("token");

  console.log("props are here", props.student.enroll_id);
  console.log("email id is here", jwtDecode(token).email);

  // confirm dialog state
  const [openConfirm, setOpenConfirm] = useState(false);

  // FancyAlert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    severity: "success",
    title: "",
    message: "",
  });

  // loader state
  const [loading, setLoading] = useState(false);

  // ⭐ Fetch Class List
  const getClasses = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.post(
        "http://localhost:5000/api/getClass",
        {},
        config
      );

      setClasses(res.data.getclass || []);
    } catch (err) {
      console.error("Class fetch error:", err);
    }
  };

  // ⭐ Fetch Subject List (By class_id)
  const getSubject = async (class_id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = new FormData();
      formData.append("class_id", class_id);

      const res = await axios.post(
        "http://localhost:5000/api/getsubject",
        formData,
        config
      );

      setAvailableSubjects(res.data.subject || []);
    } catch (err) {
      console.error("Subject fetch error:", err);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  // ⭐ Class Change
  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClassId(classId);

    const selectedClassObj = classes.find((cls) => cls.class_id === classId);

    setSelectedClassName(selectedClassObj?.class || "");

    // Fetch subjects
    getSubject(classId);

    // Reset rows
    setRows([{ subject_id: "", scored_marks: "", max_marks: "" }]);
  };

  // ⭐ Handle Row Change
  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleAddRow = () => {
    setRows([...rows, { subject_id: "", scored_marks: "", max_marks: "" }]);
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // ⭐ Submit (Confirm dialog se yes ke baad chalega)
  const submitMarks = async () => {
    const objecttobeSend = {
      email: jwtDecode(token).email,
      enroll_id: props.student.enroll_id,
      class_id: selectedClassId,
      marks: rows,
    };

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        "http://localhost:5000/api/markssubmit",
        objecttobeSend,
        config
      );
      console.log("response for submision of the marks is here", res);

      // success alert
      setAlertConfig({
        severity: "success",
        title: "Marks submitted",
        message: "Marks have been saved successfully for this student.",
      });
      setAlertOpen(true);
    } catch (err) {
      console.error("Marks submit error:", err);

      // error alert
      const msg =
        err.response?.data?.message || "Failed to submit marks. Please try again.";
      setAlertConfig({
        severity: "error",
        title: "Submit failed",
        message: msg,
      });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // form submit handler: sirf dialog open kare
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirm(true);
  };

  const handleConfirmYes = () => {
    setOpenConfirm(false);
    submitMarks();
  };

  const handleConfirmNo = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      {/* ✅ loader overlay */}
      {loading && <StudentLoader />}

      <form
        className="marks-container"
        onSubmit={handleSubmit}
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {/* Class Dropdown */}
        <div className="field-group">
          <label className="field-label">Class</label>

          <select
            className="select-box"
            value={selectedClassId}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>

            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_id}>
                {cls.class}
              </option>
            ))}
          </select>
        </div>

        {selectedClassId && (
          <div>
            {rows.map((row, index) => (
              <div className="row-box" key={index}>
                {/* ⭐ Subject Dropdown */}
                <select
                  className="select-box"
                  value={row.subject_id}
                  onChange={(e) =>
                    handleRowChange(index, "subject_id", e.target.value)
                  }
                >
                  <option value="">Select Subject</option>

                  {availableSubjects.map((sub) => (
                    <option key={sub.id} value={sub.subject_id}>
                      {sub.subject}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="input-box"
                  placeholder="Scored Marks"
                  value={row.scored_marks}
                  onChange={(e) =>
                    handleRowChange(index, "scored_marks", e.target.value)
                  }
                />

                <input
                  type="number"
                  className="input-box"
                  placeholder="Max Marks"
                  value={row.max_marks}
                  onChange={(e) =>
                    handleRowChange(index, "max_marks", e.target.value)
                  }
                />

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveRow(index)}
                  disabled={rows.length === 1}
                >
                  ✖
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-btn"
              onClick={handleAddRow}
            >
              + Add Subject
            </button>
          </div>
        )}

        <button
          className="submit-btn"
          type="submit"
          disabled={!selectedClassId || loading}
        >
          Submit
        </button>
      </form>

      {/* Confirm dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Submit marks?"
        message="Do you want to submit these marks for this student?"
        confirmText="Yes, submit"
        cancelText="No, review again"
        emphasis="primary"
        onConfirm={handleConfirmYes}
        onCancel={handleConfirmNo}
      />

      {/* FancyAlert - success / error */}
      {alertOpen && (
        <FancyAlert
          severity={alertConfig.severity}
          title={alertConfig.title}
          message={alertConfig.message}
          onClose={() => setAlertOpen(false)}
        />
      )}
    </>
  );
};

export default MarksForm;
