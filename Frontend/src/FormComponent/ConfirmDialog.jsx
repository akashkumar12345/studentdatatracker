// ConfirmDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide,
  Stack,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, continue",
  cancelText = "No, cancel",
  onConfirm,
  onCancel,
  emphasis = "danger", // "danger" | "primary"
}) => {
  const handleClose = (confirmed) => {
    if (confirmed) onConfirm && onConfirm();
    else onCancel && onCancel();
  };

  const isDanger = emphasis === "danger";

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(false)}
      PaperProps={{
        sx: {
          borderRadius: 4,
          px: 0,
          pb: 1.8,
          pt: 0,
          background:
            "radial-gradient(circle at top, rgba(30,64,175,0.9) 0, #020617 55%, #000 100%)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
          color: "#e5e7eb",
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(18px)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            border: "1px solid rgba(148,163,184,0.5)",
            pointerEvents: "none",
          },
          // shining strip
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-40%",
            left: "-30%",
            width: "40%",
            height: "180%",
            background:
              "linear-gradient(120deg, transparent, rgba(255,255,255,0.7), transparent)",
            transform: "skewX(-20deg)",
            animation: "shineConfirm 2.2s linear infinite",
            opacity: 0.7,
          },
          "@keyframes shineConfirm": {
            "0%": { left: "-40%" },
            "100%": { left: "130%" },
          },
        },
      }}
    >
      {/* top gradient bar */}
      <Box
        sx={{
          height: 3,
          width: "100%",
          background:
            "linear-gradient(90deg,#f97316,#eab308,#22c55e,#3b82f6,#a855f7,#ec4899)",
        }}
      />

      {/* Title + Icon row */}
      <DialogTitle sx={{ pb: 0, pt: 1.6, px: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDanger
                ? "rgba(239,68,68,0.18)"
                : "rgba(59,130,246,0.18)",
              color: isDanger ? "#f97373" : "#93c5fd",
              flexShrink: 0,
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: 0.4,
            }}
          >
            {title}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: 1, px: 3 }}>
        <Typography
          variant="body2"
          sx={{ color: "#cbd5f5", fontSize: 13.5, lineHeight: 1.6, mb: 1 }}
        >
          {message}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#9ca3af", fontSize: 11.5 }}
        >
          You can’t undo this later, so please confirm you really want to
          continue.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pt: 2,
          pb: 2.4,
          gap: 1.5,
          justifyContent: "flex-end",
        }}
      >
        {/* Cancel is left, looks safe & neutral */}
        <Button
          onClick={() => handleClose(false)}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 999,
            px: 2.8,
            borderColor: "rgba(148,163,184,0.7)",
            color: "#e5e7eb",
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(15,23,42,0.6)",
            "&:hover": {
              borderColor: "#e5e7eb",
              backgroundColor: "rgba(31,41,55,0.9)",
            },
          }}
        >
          {cancelText}
        </Button>

        {/* Confirm is right, strong color */}
        <Button
          onClick={() => handleClose(true)}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 999,
            px: 3,
            boxShadow: isDanger
              ? "0 18px 45px rgba(248,113,113,0.65)"
              : "0 18px 45px rgba(59,130,246,0.55)",
            background: isDanger
              ? "linear-gradient(135deg, #ef4444, #dc2626 40%, #b91c1c)"
              : "linear-gradient(135deg,#3b82f6,#2563eb 40%,#1d4ed8)",
            "&:hover": {
              background: isDanger
                ? "linear-gradient(135deg,#f97373,#ef4444 45%,#b91c1c)"
                : "linear-gradient(135deg,#60a5fa,#3b82f6 45%,#1d4ed8)",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
