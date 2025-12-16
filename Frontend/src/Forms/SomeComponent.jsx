import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ConfirmDialog from "../FormComponent/ConfirmDialog";

const SomeComponent = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteClick = () => setOpenConfirm(true);

  const handleConfirm = () => {
    setOpenConfirm(false);
    // yahan delete / logout / koi bhi critical action
    console.log("User confirmed");
  };

  const handleCancel = () => {
    setOpenConfirm(false);
    console.log("User cancelled");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="contained" color="error" onClick={handleDeleteClick}>
        Open Confirm Box
      </Button>

      <ConfirmDialog
        open={openConfirm}
        title="Delete this record?"
        message="This will permanently remove the student record from the system."
        confirmText="Yes, delete"
        cancelText="No, keep it"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default SomeComponent;
