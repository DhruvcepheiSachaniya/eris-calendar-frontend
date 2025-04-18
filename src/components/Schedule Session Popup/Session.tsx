import React, { useState, useEffect } from "react";
import { addSession, editSession } from "../../../api.js";
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
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Session = ({
  open,
  handleClose,
  setRefreshTrigger,
  eventDetails,
  isEdit,
  doctorList,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveSession = async () => {
    try {
      setIsButtonLoading(true);
      const { date, startTime, endTime, doctor, reason } = formData;
      const localDate = new Date(date);
      const [startHours, startMinutes] = startTime.split(":");
      const [endHours, endMinutes] = endTime.split(":");
      const start = new Date(localDate);
      start.setHours(Number(startHours), Number(startMinutes), 0);
      const end = new Date(localDate);
      end.setHours(Number(endHours), Number(endMinutes), 0);

      const response = await addSession({
        date: new Date().toISOString(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        Study: "Campaign1",
        drCode: formData.doctor,
        drspeciality: "Cardiology",
        empCode: "EMP002",
      });
      if (response.status) {
        toast.success("Session Scheduled Successfully");
        handleClose();
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleEditSession = async () => {
    try {
      setIsButtonLoading(true);
      const { date, startTime, endTime, doctor, reason } = formData;
      const localDate = new Date(date);
      const [startHours, startMinutes] = startTime.split(":");
      const [endHours, endMinutes] = endTime.split(":");
      const start = new Date(localDate);
      start.setHours(Number(startHours), Number(startMinutes), 0);
      const end = new Date(localDate);
      end.setHours(Number(endHours), Number(endMinutes), 0);

      const response = await editSession({
        sessionId: eventDetails.id,
        date: new Date().toISOString(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        select_reason: formData.reason,
      });
      if (response.status) {
        toast.success("Session Edited Successfully");
        handleClose();
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsButtonLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setFormData({
        doctor: eventDetails.title.split,
        date: format(new Date(eventDetails.start), "yyyy-MM-dd"),
        startTime: format(new Date(eventDetails.start), "HH:mm"),
        endTime: format(new Date(eventDetails.end), "HH:mm"),
        reason: "",
      });
    }
  }, [isEdit]);

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
            {isEdit ? "Edit Session" : "Schedule New Session"}
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
            {doctorList.map((doctor) => (
              <MenuItem value={doctor.drCode}>{doctor.drName}</MenuItem>
            ))}
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
              inputProps={{ min: today }}
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
              inputProps={{
                min: formData.startTime || "00:00", // disables times before startTime
              }}
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
        <Box sx={{ mb: 3, display: isEdit ? "" : "none" }}>
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
            onClick={isEdit ? handleEditSession : handleSaveSession}
            variant="contained"
            sx={{ backgroundColor: "#2B72E6", color: "#FFF" }}
          >
            {isButtonLoading ? <CircularProgress /> : "Save Session"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const today = new Date().toISOString().split("T")[0]; // e.g. '2025-04-16'

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
