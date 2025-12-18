// AddStudent.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import CustomTextField from "../FormComponent/CustomTextField";
import LabelText from "../FormComponent/LabelText";
import Dropdown from "../FormComponent/DropDown";
import ConfirmDialog from "../FormComponent/ConfirmDialog";
import FancyAlert from "../FormComponent/FancyAlert";
import StudentLoader from "../StudentLoader";

const AddStudent = () => {
  const token = Cookies.get("token");
  const decoded = token ? jwtDecode(token) : null;

  const [genderOptions, setGenderOptions] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    parentName: "",
    nationality: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    email: decoded?.email || "",
    gender: "",
    caste: "",
    state: "",
    date_of_birth: "",
    parent_mobile_number: "",
    emergency_number: "",
    previous_school: "",
    distt: "",
  });

  const [loading, setLoading] = useState(false);

  // confirm dialog state
  const [openConfirm, setOpenConfirm] = useState(false);

  // FancyAlert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    severity: "success",
    title: "",
    message: "",
  });

  // =========================
  // Validation helpers
  // =========================

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]{2,50}$/;
    return re.test(name.trim());
  };

  const validateDate = (date) => {
    if (!date) return false;
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 5 && age <= 18;
  };

  const validateRequired = (value) => value.trim() !== "";

  // Per-field validation (onChange ke time)
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!validateRequired(value)) return "First Name is required";
        if (!validateName(value))
          return "First name must be 2–50 letters (A–Z) only";
        return "";

      case "middleName":
        if (value && !validateName(value))
          return "Middle name must contain letters only";
        return "";

      case "lastName":
        if (!validateRequired(value)) return "Last Name is required";
        if (!validateName(value))
          return "Last name must be 2–50 letters (A–Z) only";
        return "";

      case "nationality":
        if (!validateRequired(value)) return "Nationality is required";
        return "";

      case "parentName":
        if (!validateRequired(value)) return "Parent Name is required";
        if (!validateName(value))
          return "Parent name must contain letters only";
        return "";

      case "address":
        if (!validateRequired(value)) return "Address is required";
        return "";

      case "date_of_birth":
        if (!validateRequired(value)) return "Date of Birth is required";
        if (!validateDate(value))
          return "Student must be between 5–18 years old";
        return "";

      case "parent_mobile_number":
        if (!validateRequired(value))
          return "Parent Mobile Number is required";
        if (!validatePhone(value))
          return "Parent mobile must be 10 digits starting with 6–9";
        return "";

      case "emergency_number":
        if (!validateRequired(value)) return "Emergency Number is required";
        if (!validatePhone(value))
          return "Emergency number must be 10 digits starting with 6–9";
        return "";

      case "previous_school":
        if (!validateRequired(value)) return "Previous School is required";
        return "";

      case "distt":
        if (!validateRequired(value)) return "District is required";
        return "";

      case "gender":
        if (!value) return "Please select gender";
        return "";

      case "caste":
        if (!value) return "Please select caste";
        return "";

      case "state":
        if (!value) return "Please select state";
        return "";

      case "email":
        if (!validateRequired(value)) return "Email is required";
        if (!validateEmail(value)) return "Invalid email format";
        return "";

      default:
        return "";
    }
  };

  // onchange handler (live validation)
  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const message = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  // Full-form validation (submit se pehle)
  const validateForm = () => {
    const newErrors = {};

    const fieldNames = [
      "firstName",
      "middleName",
      "lastName",
      "nationality",
      "parentName",
      "address",
      "date_of_birth",
      "parent_mobile_number",
      "emergency_number",
      "previous_school",
      "distt",
      "gender",
      "caste",
      "state",
      "email",
    ];

    fieldNames.forEach((field) => {
      const msg = validateField(field, formData[field] || "");
      if (msg) newErrors[field] = msg;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Field configs
  const getFieldConfig = (name, type, placeholder, label) => ({
    name,
    type,
    placeholder,
    label,
    helperText: errors[name] || "",
    error: !!errors[name],
    defaultValue: formData[name],
  });

  const firstName = getFieldConfig(
    "firstName",
    "text",
    "Enter First Name",
    "First Name"
  );
  const middleName = getFieldConfig(
    "middleName",
    "text",
    "Enter Middle Name (Optional)",
    "Middle Name"
  );
  const lastName = getFieldConfig(
    "lastName",
    "text",
    "Enter Last Name",
    "Last Name"
  );
  const nationality = getFieldConfig(
    "nationality",
    "text",
    "Enter Nationality",
    "Nationality"
  );
  const parentName = getFieldConfig(
    "parentName",
    "text",
    "Enter Parent Name",
    "Parent Name"
  );
  const address = getFieldConfig(
    "address",
    "text",
    "Enter Address",
    "Address"
  );
  const date_of_birth = getFieldConfig("date_of_birth", "date", "", "Date of Birth");
  const parent_mobile_number = getFieldConfig(
    "parent_mobile_number",
    "number",
    "Enter Parent Mobile Number",
    "Parent mobile number"
  );
  const previous_school = getFieldConfig(
    "previous_school",
    "text",
    "Enter Previous School",
    "Previous School"
  );
  const distt = getFieldConfig(
    "distt",
    "text",
    "Enter District",
    "District"
  );
  const emergency_number = getFieldConfig(
    "emergency_number",
    "number",
    "Enter emergency number",
    "Emergency Number"
  );

  // =========================
  // Submit handlers
  // =========================

  const handleConfirmSubmit = async () => {
    if (!validateForm()) {
      setAlertConfig({
        severity: "error",
        title: "Validation Error",
        message:
          "Please fix the errors in red fields before submitting.",
      });
      setAlertOpen(true);
      return;
    }

    setOpenConfirm(false);
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const url = `${process.env.REACT_APP_SERVER_URL}/auth/addStudent`;
      const res = await axios.post(url, formData);

      console.log("Response:", res.data);

      setFormData({
        parentName: "",
        nationality: "",
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        email: jwtDecode(token).email,
        gender: "",
        caste: "",
        state: "",
        date_of_birth: "",
        parent_mobile_number: "",
        emergency_number: "",
        previous_school: "",
        distt: "",
      });
      setErrors({});

      setAlertConfig({
        severity: "success",
        title: "Student added",
        message: "Student record has been saved successfully.",
      });
      setAlertOpen(true);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );

      const apiMsg =
        error.response?.data?.message ||
        "Something went wrong while saving.";
      setAlertConfig({
        severity: "error",
        title: "Submit failed",
        message: apiMsg,
      });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConfirm = () => {
    if (validateForm()) {
      setOpenConfirm(true);
    } else {
      setAlertConfig({
        severity: "warning",
        title: "Incomplete Form",
        message:
          "Please fill all required fields correctly before submitting.",
      });
      setAlertOpen(true);
    }
  };

  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const handleReset = () => {
    setFormData({
      parentName: "",
      nationality: "",
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      email: decoded?.email || "",
      gender: "",
      caste: "",
      state: "",
      date_of_birth: "",
      parent_mobile_number: "",
      emergency_number: "",
      previous_school: "",
      distt: "",
    });
    setErrors({});
  };

  // =========================
  // Fetch dropdown options
  // =========================

  const fetchingGender = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = `${process.env.REACT_APP_SERVER_URL}/getGender`;
      const res = await axios.post(url, {}, { headers });
      setGenderOptions(res.data.gender || []);
    } catch (error) {
      console.error(
        "Error fetching gender:",
        error.response?.data || error.message
      );
    }
  };

  const fetchingCaste = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = `${process.env.REACT_APP_SERVER_URL}/getCaste`;
      const res = await axios.post(url, {}, { headers });
      setCasteOptions(res.data.caste || []);
    } catch (error) {
      console.error(
        "Error fetching caste:",
        error.response?.data || error.message
      );
    }
  };

  const fetchingState = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = `${process.env.REACT_APP_SERVER_URL}/getState`;
      const res = await axios.post(url, {}, { headers });
      setStateOptions(res.data.state || []);
    } catch (error) {
      console.error(
        "Error fetching state:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchingGender();
    fetchingCaste();
    fetchingState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // JSX
  // =========================

  return (
    <div style={{ position: "relative" }}>
      {loading && <StudentLoader />}

      <Box
        sx={{
          background: "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)",
          p: 2,
          borderRadius: 2,
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Box sx={{ background: "#f0f4f8", p: 2, borderRadius: 2 }}>
            <Grid item xs={12} md={10} lg={8}>
              {Object.keys(errors).length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Please fix {Object.keys(errors).length} error(s):{" "}
                  {Object.keys(errors).join(", ")}.
                </Alert>
              )}

              <Grid container spacing={3}>
                {/* Column 1 */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="First Name" required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField {...firstName} onchange={onChange} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="Last Name" required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField {...lastName} onchange={onChange} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="Nationality" required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField
                        {...nationality}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="StuGender" required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Dropdown
                        label="StuGender"
                        name="gender"
                        value={formData.gender}
                        onChange={onChange}
                        options={genderOptions}
                        getOptionLabel={(opt) => opt.gender_name}
                        getOptionValue={(opt) => opt.gender_name}
                        placeholder="Select Gender"
                        error={!!errors.gender}
                        helperText={errors.gender}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="P.Mob. No." required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField
                        {...parent_mobile_number}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="Emerg. No" required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField
                        {...emergency_number}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="District/Di." required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField {...distt} onchange={onChange} />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Column 2 */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Middle Name" required={false} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CustomTextField
                        {...middleName}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Parent Name" required />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CustomTextField
                        {...parentName}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Address Line" required />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CustomTextField {...address} onchange={onChange} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Date of Birth" required />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CustomTextField
                        {...date_of_birth}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Caste/Categ." required />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Dropdown
                        label="Caste"
                        name="caste"
                        value={formData.caste}
                        onChange={onChange}
                        options={casteOptions}
                        getOptionLabel={(opt) => opt.category}
                        getOptionValue={(opt) => opt.category}
                        placeholder="Select Caste"
                        error={!!errors.caste}
                        helperText={errors.caste}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Prev. School" required />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CustomTextField
                        {...previous_school}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="State" required />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Dropdown
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={onChange}
                        options={stateOptions}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.name}
                        placeholder="Select State"
                        error={!!errors.state}
                        helperText={errors.state}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Buttons */}
              <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ mt: 3 }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={handleOpenConfirm}
                    startIcon={
                      loading ? <CircularProgress size={18} /> : null
                    }
                  >
                    {loading ? "Saving..." : "Submit"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>

      {/* Confirm dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Submit student details?"
        message="Do you want to save this student record with the information you have entered?"
        confirmText="Yes, submit"
        cancelText="No, go back"
        emphasis="primary"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelConfirm}
      />

      {/* FancyAlert */}
      {alertOpen && (
        <FancyAlert
          severity={alertConfig.severity}
          title={alertConfig.title}
          message={alertConfig.message}
          onClose={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default AddStudent;
