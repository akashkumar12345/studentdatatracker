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
import CustomTextField from "../FormComponent/CustomTextField";
import { jwtDecode } from "jwt-decode";
import LabelText from "../FormComponent/LabelText";
import Dropdown from "../FormComponent/DropDown";
import ConfirmDialog from "../FormComponent/ConfirmDialog";
import FancyAlert from "../FormComponent/FancyAlert";
import StudentLoader from "../StudentLoader";

const AddStudent = () => {
  const token = Cookies.get("token");
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

  // Validation functions
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
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 5 && age <= 18; // Student age range
  };

  const validateRequired = (value) => value.trim() !== "";

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation (Middle Name REMOVED)
    const requiredFields = [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "nationality", label: "Nationality" },
      { name: "parentName", label: "Parent Name" },
      { name: "address", label: "Address" },
      { name: "date_of_birth", label: "Date of Birth" },
      { name: "parent_mobile_number", label: "Parent Mobile Number" },
      { name: "emergency_number", label: "Emergency Number" },
      { name: "previous_school", label: "Previous School" },
      { name: "distt", label: "District" },
      { name: "gender", label: "Gender" },
      { name: "caste", label: "Caste" },
      { name: "state", label: "State" },
    ];

    requiredFields.forEach(({ name, label }) => {
      if (!validateRequired(formData[name])) {
        newErrors[name] = `${label} is required`;
      }
    });

    // Name validations (Middle name only validates format, not required)
    if (formData.firstName && !validateName(formData.firstName)) {
      newErrors.firstName = "First name must be 2-50 letters only";
    }
    if (formData.middleName && !validateName(formData.middleName)) {
      newErrors.middleName = "Middle name must be letters only";
    }
    if (formData.lastName && !validateName(formData.lastName)) {
      newErrors.lastName = "Last name must be 2-50 letters only";
    }
    if (formData.parentName && !validateName(formData.parentName)) {
      newErrors.parentName = "Parent name must be letters only";
    }

    // Phone validations
    if (formData.parent_mobile_number && !validatePhone(formData.parent_mobile_number)) {
      newErrors.parent_mobile_number = "Parent mobile must be 10 digits starting with 6-9";
    }
    if (formData.emergency_number && !validatePhone(formData.emergency_number)) {
      newErrors.emergency_number = "Emergency number must be 10 digits starting with 6-9";
    }

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Date validation
    if (formData.date_of_birth && !validateDate(formData.date_of_birth)) {
      newErrors.date_of_birth = "Student must be between 5-18 years old";
    }

    // Dropdown validations
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.caste) newErrors.caste = "Please select caste";
    if (!formData.state) newErrors.state = "Please select state";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Field configs with helperText for errors
  const getFieldConfig = (name, type, placeholder, label, required = true) => ({
    name,
    type,
    placeholder,
    label,
    helperText: errors[name] || "",
    error: !!errors[name],
    defaultValue: formData[name],
  });

  const firstName = getFieldConfig("firstName", "text", "Enter First Name", "First Name", true);
  const middleName = getFieldConfig("middleName", "text", "Enter Middle Name (Optional)", "Middle Name", false); // ❌ Non-mandatory
  const lastName = getFieldConfig("lastName", "text", "Enter Last Name", "Last Name", true);
  const nationality = getFieldConfig("nationality", "text", "Enter Nationality", "Nationality", true);
  const parentName = getFieldConfig("parentName", "text", "Enter Parent Name", "Parent Name", true);
  const address = getFieldConfig("address", "text", "Enter Address", "Address", true);
  const date_of_birth = getFieldConfig("date_of_birth", "date", "", true);
  const parent_mobile_number = getFieldConfig("parent_mobile_number", "number", "Enter Parent Mobile Number", "Parent mobile number", true);
  const previous_school = getFieldConfig("previous_school", "text", "Enter Previous School", "Previous School", true);
  const distt = getFieldConfig("distt", "text", "Enter District", "District", true);
  const emergency_number = getFieldConfig("emergency_number", "number", "Enter emergency number", "Emergency Number", true);

  // actual submit (Yes pe chalega)
  const handleConfirmSubmit = async () => {
    if (!validateForm()) {
      setAlertConfig({
        severity: "error",
        title: "Validation Error",
        message: "Please fix the errors in red fields before submitting.",
      });
      setAlertOpen(true);
      return;
    }

    setOpenConfirm(false);
    try {
      setLoading(true);
      const token = Cookies.get("token");
      console.log("token is here", jwtDecode(token).email);
      console.log("formData", formData);

      const url = "http://localhost:5000/api/auth/addStudent";
      const res = await axios.post(url, formData);

      console.log("Response:", res.data);

      // Reset form on success
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

      // success alert
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

      // error alert
      const apiMsg =
        error.response?.data?.message || "Something went wrong while saving.";
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

  // sirf dialog open - validate before opening
  const handleOpenConfirm = () => {
    if (validateForm()) {
      setOpenConfirm(true);
    } else {
      setAlertConfig({
        severity: "warning",
        title: "Incomplete Form",
        message: "Please fill all required fields correctly before submitting.",
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
  };

  const fetchingGender = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = "http://localhost:5000/api/getGender";
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
      const url = "http://localhost:5000/api/getCaste";
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
      const url = "http://localhost:5000/api/getState";
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
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* ✅ tea loader overlay */}
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
                  Please fix {Object.keys(errors).length} error(s) before submitting.
                </Alert>
              )}
              
              <Grid container spacing={3}>
                {/* Column 1 */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="First Name" required={true} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField
                        {...firstName}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="Last Name" required={true} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField
                        {...lastName}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <LabelText title="Nationality" required={true} />
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
                      <LabelText title="StuGender" required={true} />
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
                      <LabelText title="P.Mob. No." required={true} />
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
                      <LabelText title="Emerg. No" required={true} />
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
                      <LabelText title="District/Di." required={true} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <CustomTextField
                        {...distt}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Column 2 */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      {/* ❌ Middle Name - NO required={true} */}
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
                      <LabelText title="Parent Name" required={true} />
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
                      <LabelText title="Address Line" required={true} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CustomTextField
                        {...address}
                        onchange={onChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <LabelText title="Date of Birth" required={true} />
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
                      <LabelText title="Caste/Categ." required={true} />
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
                      <LabelText title="Prev. School" required={true} />
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
                      <LabelText title="State" required={true} />
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

      {/* FancyAlert - success / error */}
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
