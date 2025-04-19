import React, { useState } from "react";
import { addSession, getPatientList, startSession } from "../../../api.js";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import LogoutIcon from "@mui/icons-material/Logout"; // or OpenInNew if preferred
import PersonIcon from "@mui/icons-material/Person";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const StartSession = ({
  open,
  handleClose,
  eventDetails,
  setOpenSessionModal,
  setOpenStartSessionModal,
  setIsEdit,
}) => {
  const navigate = useNavigate();
  // console.log(eventDetails);
  const handleStartSession = async () => {
    try {
      const response = await startSession(eventDetails.id);
      if (response.status) {
        toast.success("Session Started Succesfully");
        navigate(`/session?drcode=${eventDetails?.drcode}&sessionid=${eventDetails.id}`);
        setOpenStartSessionModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          size="small"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#000",
            fontFamily: "GilroySemiBold",
            fontSize: "1.25rem",
          }}
        >
          {eventDetails.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{
            color: "#747474",
            fontFamily: "GilroySemibold",
            fontSize: "0.875rem",
          }}
        >
          {eventDetails?.start && eventDetails?.end
            ? `${format(eventDetails.start, "HH:mm")} - ${format(
                eventDetails.end,
                "HH:mm"
              )}`
            : "Loading..."}
        </Typography>

        <Box display="flex" alignItems="center" mb={3} gap="10px">
          <Typography
            variant="body2"
            fontWeight="500"
            sx={{
              color: "#000",
              fontFamily: "GilroySemibold",
              fontSize: "1rem",
            }}
          >
            Registered Patients
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              ...(eventDetails.status === "Scheduled"
                ? {
                    color: "#95969C",
                    fontFamily: "GilroySemibold",
                    fontSize: "0.75rem",
                  }
                : {
                    color: "#000",
                    fontFamily: "GilroySemiBold",
                    fontSize: "1.25rem",
                  }),
            }}
          >
            {eventDetails.status === "Scheduled"
              ? "Session yet to start"
              : eventDetails.patients}
          </Typography>
        </Box>

        {/* Buttons */}
        <Stack direction="row" spacing={2}>
          {eventDetails.status === "Scheduled" ? (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                setIsEdit(true);
                setOpenStartSessionModal(false);
                setOpenSessionModal(true);
              }}
              size="small"
              sx={{
                textTransform: "none",
                color: "#2B72E6",
                borderRadius: "0.25rem",
                border: "1px solid #2B72E6",
                fontFamily: "GilroySemibold",
              }}
            >
              Edit Session
            </Button>
          ) : eventDetails.status === "Ended" ? (
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                navigate(
                  `/session-page?sessionid=${eventDetails.id}&drcode=${eventDetails.drcode}`
                );
              }}
              size="small"
              sx={{
                textTransform: "none",
                color: "#2B72E6",
                borderRadius: "0.25rem",
                border: "1px solid #2B72E6",
                fontFamily: "GilroySemibold",
              }}
            >
              View Session
            </Button>
          ) : (
            <Button
              onClick={() =>
                navigate(
                  `/session?sessionid=${eventDetails.id}&drcode=${eventDetails.drcode}`
                )
              }
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                backgroundColor: "#FFD996",
                color: "#6B4F1D",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#f0c779",
                },
              }}
            >
              Continue Session
            </Button>
          )}

          {eventDetails.status === "Scheduled" ? (
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              size="small"
              sx={{
                textTransform: "none",
                color: "#fff",
                backgroundColor: "#2B72E6",
                fontFamily: "GilroySemibold",
              }}
              onClick={handleStartSession}
            >
              Start Session
            </Button>
          ) : eventDetails.status === "Started" ? (
            <Button
              variant="outlined"
              startIcon={<BlockIcon />}
              size="small"
              sx={{
                textTransform: "none",
                color: "#E63946",
                borderColor: "#E63946",
                fontFamily: "GilroySemibold",
                "&:hover": {
                  borderColor: "#c72d39",
                  backgroundColor: "rgba(230, 57, 70, 0.04)",
                },
              }}
              onClick={() => navigate(`/end?sessionid=${eventDetails.id}`)}
            >
              End Session
            </Button>
          ) : null}
        </Stack>
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

export default StartSession;
