// FancyAlert.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FancyAlert = ({
  open: controlledOpen,
  onClose,
  severity = "success",        // "success" | "error" | "warning" | "info"
  title = "Success",
  message = "Action completed successfully.",
}) => {
  const [internalOpen, setInternalOpen] = useState(true);

  const isOpen =
    typeof controlledOpen === "boolean" ? controlledOpen : internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setInternalOpen(true);
  }, []);

  if (!isOpen) return null;

  const bg =
    severity === "success"
      ? "linear-gradient(135deg,#22c55e,#16a34a)"
      : severity === "error"
      ? "linear-gradient(135deg,#ef4444,#b91c1c)"
      : severity === "warning"
      ? "linear-gradient(135deg,#f59e0b,#b45309)"
      : "linear-gradient(135deg,#3b82f6,#1d4ed8)";

  return (
    <Box
      onClick={handleClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(15,23,42,0.45)",
      }}
    >
      <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
        <Card
          onClick={(e) => e.stopPropagation()}
          sx={{
            minWidth: 360,
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            background: bg,
            color: "#f9fafb",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-40%",
              width: "40%",
              height: "100%",
              background:
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "skewX(-20deg)",
              animation: "shine 2s linear infinite",
            },
            "@keyframes shine": {
              "0%": { left: "-40%" },
              "100%": { left: "120%" },
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#e5e7eb",
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent sx={{ py: 3, px: 3.5, position: "relative", zIndex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                letterSpacing: 0.4,
                mb: 0.8,
                textTransform: "uppercase",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.95, fontSize: 14 }}
            >
              {message}
            </Typography>
          </CardContent>
        </Card>
      </Slide>
    </Box>
  );
};

export default FancyAlert;
