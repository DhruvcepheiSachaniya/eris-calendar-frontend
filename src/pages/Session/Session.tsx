import LogoutBar from "../../components/Logout Bar/LogoutBar";
import PatientTable from "../../components/Table/Table";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getPatientList } from "../../../api.js";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
const SessionPage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionid = searchParams.get("sessionid");
  const [patientList, setPatientList] = useState([]);
  const [doctor, setDoctor] = useState({ name: "", speciality: "" });

  const fetchPatientList = async (sessionid) => {
    try {
      setIsPageLoading(true);
      const response = await getPatientList(sessionid);
      if (response.status) {
        setPatientList(response.find_session.patients);
        setDoctor({
          name: response.find_session.dr_code,
          speciality: response.find_session.dr_speciality,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientList(sessionid);
  }, []);

  if (isPageLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "blue" }} />
      </div>
    );
  }
  return (
    <div className="session-page-container">
      <LogoutBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          gap: 2,
          mb: 3,
          flexWrap: "nowrap", // force a single row
        }}
      >
        {/* Left - Doctor Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: "GilroySemiBold",
              fontSize: "1.5rem",
              color: "#191d23",
              whiteSpace: "nowrap",
            }}
          >
            {doctor.name}
          </Typography>

          <FiberManualRecordIcon
            sx={{ fontSize: "0.5rem", color: "#191d23" }}
          />

          <Typography
            sx={{
              fontFamily: "GilroySemiBold",
              fontSize: "1.5rem",
              color: "#191d23",
              whiteSpace: "nowrap",
            }}
          >
            {doctor.speciality}
          </Typography>

          <ChevronRightIcon sx={{ color: "#191d23" }} />

          <Typography
            sx={{
              fontFamily: "GilroySemiBold",
              fontSize: "1.5rem",
              color: "#191d23",
              whiteSpace: "nowrap",
            }}
          >
            Patients
          </Typography>
        </Box>

        {/* Right - Search + Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexShrink: 0,
          }}
        >
          {/* Search Bar */}
          <TextField
            placeholder="Search for patients"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#64748B" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "200px",
              backgroundColor: "#F9FAFB",
              borderRadius: "0.5rem",
              "& .MuiOutlinedInput-root": {
                fontFamily: "GilroySemiBold",
                fontSize: "1rem",
                border: "1px solid #E5E7EB",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                },
                "&:hover fieldset": {
                  borderColor: "#D1D5DB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3B82F6",
                },
              },
            }}
          />

          {/* Add Patient Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              fontFamily: "GilroySemiBold",
              fontSize: "1.125rem",
              textTransform: "none",
              borderRadius: "0.5rem",
              minWidth: "140px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#2563EB",
                boxShadow: "none",
              },
            }}
          >
            Add Patient
          </Button>

          {/* End Session Button */}
          <Button
            variant="outlined"
            startIcon={<BlockIcon />}
            sx={{
              color: "red",
              borderColor: "red",
              fontFamily: "GilroySemiBold",
              fontSize: "1.125rem",
              textTransform: "none",
              borderRadius: "0.5rem",
              minWidth: "140px",
              "&:hover": {
                borderColor: "#cc0000",
                backgroundColor: "#fff0f0",
              },
            }}
          >
            End Session
          </Button>
        </Box>
      </Box>

      <PatientTable patientList={patientList} />
    </div>
  );
};

export default SessionPage;
