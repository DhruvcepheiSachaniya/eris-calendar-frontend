import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPatientDetails } from "../../../api.js";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutBar from "../../components/Logout Bar/LogoutBar.js";

const ViewPatientPage = () => {
  const location = useLocation();
  const patientCode = location?.state?.patientcode;
  const drcode = location?.state?.drcode;
  const [searchParams] = useSearchParams();
  //   const sessionid = location?.state?.sessionid;

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await GetPatientDetails(patientCode);
      setPatient(data?.patient);
      setLoading(false);
    };
    if (patientCode) fetchDetails();
  }, [patientCode]);

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="view-patient-container">
      <LogoutBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "GilroySemiBold",
            fontSize: "1.5rem",
            color: "#191d23",
          }}
        >
          {drcode}
        </Typography>
        <FiberManualRecordIcon sx={{ fontSize: "0.5rem", color: "#191d23" }} />
        <Typography
          sx={{
            fontFamily: "GilroySemiBold",
            fontSize: "1.5rem",
            color: "#191d23",
          }}
        >
          Cardiologist
        </Typography>
        <ChevronRightIcon sx={{ color: "#191d23" }} />
        <Typography
          sx={{
            fontFamily: "GilroySemiBold",
            fontSize: "1.5rem",
            color: "#191d23",
          }}
        >
          Patients
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={2} gap={2} pl="20px">
        <Typography
          fontFamily="GilroySemibold"
          fontSize="1.125rem"
          color="#007AFF"
        >
          Patient Details
        </Typography>
        <Typography
          fontSize={"12px"}
          color="#BCBCC0"
          display="flex"
          alignItems="center"
          gap="5px"
        >
          <VisibilityIcon sx={{ color: "#BCBCC0", fontSize: "18px" }} /> View
          Only
        </Typography>
      </Box>
      <Grid container spacing={8} mb={4} pl="20px">
        {[
          {
            label: "Patient Code",
            value: patientCode,
          },
          {
            label: "Patient name",
            value: patient?.name,
          },
          {
            label: "Age",
            value: patient?.age,
          },
          {
            label: "Gender",
            value: patient?.gender,
          },
        ].map((item, idx) => (
          <Grid item xs={6} sm={3} key={idx}>
            <Typography
              fontSize={"0.9375rem"}
              color="#707179"
              fontFamily="GilroyMedium"
              mb={1}
            >
              {item.label}
            </Typography>
            <Typography
              fontSize={"1.125rem"}
              fontFamily="GilroySemibold"
              color="#4E4E55"
            >
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 3 }}>
        {/* Prescription View */}
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Typography
            sx={{
              mb: 1,
              fontFamily: "GilroySemiBold",
              fontSize: "1.25rem",
              color: "#707179",
            }}
          >
            Patient’s Prescription (Rx)
          </Typography>
          <Box
            sx={{
              border: "2px solid #F37957",
              borderRadius: "0.5rem",
              height: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: 250, height: 250, opacity: 0.4 }}>
              <img
                src={patient?.prescription_img}
                alt="Prescription"
                style={{ width: 250, height: 250, objectFit: "contain" }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                left: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{ background: "#FCE7E3", color: "#F37957" }}
                startIcon={<VisibilityIcon />}
                href={patient?.prescription_img}
                target="_blank"
              >
                View full Image
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Report View */}
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Typography
            sx={{
              mb: 1,
              fontFamily: "GilroySemiBold",
              fontSize: "1.25rem",
              color: "#707179",
            }}
          >
            Patient’s Report
          </Typography>
          <Box
            sx={{
              border: "2px solid #2B72E6",
              borderRadius: "0.5rem",
              height: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: "250", height: "250", opacity: 0.4 }}>
              <iframe
                src={patient?.report_img}
                title="Report"
                style={{
                  width: "250",
                  height: "250",
                  border: "none",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                left: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{ color: "#2B72E6", background: "#78A5FE40" }}
                startIcon={<VisibilityIcon />}
                href={patient?.report_img}
                target="_blank"
              >
                View full Image
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Session Details Button */}
      <Box display="flex" justifyContent="flex-end" pr="15px">
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{ background: "#2B72E6", color: "white" }}
          size="large"
        >
          <ArrowBackIosIcon /> Session Details
        </Button>
      </Box>
    </div>
  );
};

export default ViewPatientPage;
