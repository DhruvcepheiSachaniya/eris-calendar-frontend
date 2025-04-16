import React, { useState } from "react";
import { addSession } from "../../../../eris-calendar-frontend/api.js";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Session = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
  });

  console.log("date: ", formData.date);
  console.log("starttime: ", formData.startTime);
  console.log("endtime: ", formData.endTime);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveSession = async () => {
    try {
      const { date, startTime, endTime, doctor, reason } = formData;

      const localDate = new Date(date); 
      const [startHours, startMinutes] = startTime.split(":");
      const [endHours, endMinutes] = endTime.split(":");

      const start = new Date(localDate);
      start.setHours(Number(startHours), Number(startMinutes), 0);

      const end = new Date(localDate);
      end.setHours(Number(endHours), Number(endMinutes), 0);

      await addSession({
        date: new Date().toISOString(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        Study: "Campaign1",
        drCode: "DR123",
        drspeciality: "Cardiology",
        empCode: "E00874",
      });

      handleClose();
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#000",
              fontFamily: "GilroySemiBold",
              fontSize: "1.25rem",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1.375rem",
            }}
          >
            Schedule New Session
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Doctor Input */}
        <Box sx={{ mb: 3 }}>
          <Typography
            fontWeight={500}
            mb={1}
            sx={{
              color: "#707179",
              fontFamily: "GilroySemiBold",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1.5rem",
            }}
          >
            Doctor
          </Typography>
          <TextField
            fullWidth
            select
            value={formData.doctor}
            onChange={handleChange("doctor")}
            placeholder="Choose the doctor for your session"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                "& fieldset": {
                  borderColor: "#BCBCC0", // default grey
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: "#2B72E6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2B72E6", // on focus
                },
              },
            }}
          >
            <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
            <MenuItem value="Dr. John">Dr. John</MenuItem>
          </TextField>
        </Box>

        {/* Date, Start Time, End Time */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              fontWeight={500}
              mb={1}
              sx={{
                color: "#707179",
                fontFamily: "GilroySemiBold",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "1.5rem",
              }}
            >
              Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={formData.date}
              onChange={handleChange("date")}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.5rem",
                  "& fieldset": {
                    borderColor: "#BCBCC0", // default grey
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2B72E6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B72E6", // on focus
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              fontWeight={500}
              mb={1}
              sx={{
                color: "#707179",
                fontFamily: "GilroySemiBold",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "1.5rem",
              }}
            >
              Start Time
            </Typography>
            <TextField
              fullWidth
              type="time"
              value={formData.startTime}
              onChange={handleChange("startTime")}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.5rem",
                  "& fieldset": {
                    borderColor: "#BCBCC0", // default grey
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2B72E6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B72E6", // on focus
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              fontWeight={500}
              mb={1}
              sx={{
                color: "#707179",
                fontFamily: "GilroySemiBold",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "1.5rem",
              }}
            >
              End Time
            </Typography>
            <TextField
              fullWidth
              type="time"
              value={formData.endTime}
              onChange={handleChange("endTime")}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.5rem",
                  "& fieldset": {
                    borderColor: "#BCBCC0", // default grey
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2B72E6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B72E6", // on focus
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Reason TextArea */}
        <Box sx={{ mb: 3 }}>
          <Typography
            fontWeight={500}
            mb={1}
            sx={{
              color: "#707179",
              fontFamily: "GilroySemiBold",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1.5rem",
            }}
          >
            Reason for editing the schedule
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="State why the schedule needs to be edited."
            value={formData.reason}
            onChange={handleChange("reason")}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                "& fieldset": {
                  borderColor: "#BCBCC0",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: "#2B72E6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2B72E6",
                },
              },
            }}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderRadius: "0.25rem",
              border: "1px solid #2B72E6",
              color: "#2B72E6",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSession}
            variant="contained"
            sx={{ backgroundColor: "#2B72E6", color: "#FFF" }}
          >
            Save Session
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default Session;
