import {
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  FormControlLabel,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { getSessionEndDetails, endSession } from "../../../api.js";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import LogoutBar from "../../components/Logout Bar/LogoutBar.js";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const EndSessionPage = () => {
  const [campExecuted, setCampExecuted] = useState("No");
  const [drKitDistributed, setDrKitDistributed] = useState("No");
  const [searchParams] = useSearchParams();
  const sessionid = searchParams.get("sessionid");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [endDetails, setEndDetails] = useState({});

  const handleCampExecutedChange = (event: any) => {
    setCampExecuted(event.target.value);
  };

  const handleDrKitChange = (event: any) => {
    setDrKitDistributed(event.target.value);
  };

  const handleEndSession = async () => {
    const payload = {
      sessionid: sessionid,
      cam_excecuted: campExecuted,
      kit_distributed: drKitDistributed,
    };

    const result = await endSession(payload);
    console.log(result);
  };

  const fetchSessionEndDetails = async (sessionid) => {
    try {
      setIsPageLoading(true);
      const response = await getSessionEndDetails(sessionid);
      if (response.status) {
        console.log(response);

        setEndDetails(response.result);
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
    fetchSessionEndDetails(sessionid);
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
    <div className="end-session-page-container">
      <LogoutBar />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: "15px",
            mt: "15px",
            pl: "15px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "GilroySemiBold",
              fontSize: "1.5rem",
              color: "#191d23",
            }}
          >
            {endDetails.drname}
          </Typography>
          <FiberManualRecordIcon
            sx={{ fontSize: "0.5rem", color: "#191d23" }}
          />
          <Typography
            sx={{
              fontFamily: "GilroySemiBold",
              fontSize: "1.5rem",
              color: "#191d23",
            }}
          >
            {endDetails.speciality}
          </Typography>
          <ChevronRightIcon sx={{ color: "#191d23" }} />
          <Typography
            sx={{
              fontFamily: "GilroySemiBold",
              fontSize: "1.5rem",
              color: "#191d23",
            }}
          >
            End Session
          </Typography>
        </Box>

        {/* Section Title */}
        <Typography
          variant="h1"
          fontWeight={400}
          mb={3}
          mt={3}
          pl="15px"
          fontSize="1.75rem"
          color="#4E4E55"
          fontFamily="GilroySemibold"
        >
          Final verifications before concluding the session
        </Typography>
        {/* Camp Details */}
        <Box mb={3}>
          <Typography
            color="#F37957"
            fontWeight="bold"
            fontSize="1.5rem"
            fontFamily="GilroySemibold"
            pl="15px"
          >
            Camp Details
          </Typography>
          <Grid container spacing={8} mt={1}>
            <Grid item xs={4} pl="15px">
              <Typography
                fontWeight={600}
                fontSize="1.25rem"
                color="#707179"
                fontFamily="GilroySemibold"
              >
                Camp Date
              </Typography>
              <Typography fontWeight={400} color="#95969C" fontSize={"20px"}>
                {dayjs(endDetails.campaignDate).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                fontWeight={600}
                fontSize="1.25rem"
                color="#707179"
                fontFamily="GilroySemibold"
              >
                Camp Executed
              </Typography>
              <RadioGroup
                row
                value={campExecuted}
                onChange={handleCampExecutedChange}
              >
                <FormControlLabel
                  value="Yes"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2B72E6" } }} />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2B72E6" } }} />
                  }
                  label="No"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography
                fontWeight={600}
                fontSize="1.25rem"
                color="#707179"
                fontFamily="GilroySemibold"
              >
                Dr. Kit Distributed
              </Typography>
              <RadioGroup
                row
                value={drKitDistributed}
                onChange={handleDrKitChange}
              >
                <FormControlLabel
                  value="Yes"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2B72E6" } }} />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2B72E6" } }} />
                  }
                  label="No"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />
        {/* Doctor Details */}
        <Box mb={4} pl="15px">
          <Stack direction="row" spacing={2}>
            <Typography
              fontWeight="bold"
              color="#007AFF"
              fontFamily="GilroySemibold"
              fontSize="1.125rem"
            >
              Doctor Details
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              fontSize="0.75rem"
              color="#BCBCC0"
              gap="5px"
              fontFamily="GilroySemibold"
            >
              <VisibilityIcon
                sx={{
                  color: "#BCBCC0",
                  fontSize: "18px",
                }}
              />
              View Only
            </Typography>
          </Stack>
          <Grid container spacing={8} mt={1}>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Reg. Code
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.drcode}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Division
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.division}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Name
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.drname}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Specialty
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.speciality}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* Employee Details */}
        <Box mb={4} pl="15px">
          <Stack direction="row" spacing={2}>
            <Typography
              fontWeight="bold"
              color="#007AFF"
              fontFamily="GilroySemibold"
              fontSize="1.125rem"
            >
              Employee Details
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              fontSize="0.75rem"
              color="#BCBCC0"
              gap="5px"
              fontFamily="GilroySemibold"
            >
              <VisibilityIcon sx={{ color: "#BCBCC0", fontSize: "18px" }} />{" "}
              View Only
            </Typography>
          </Stack>
          <Grid container spacing={8} mt={1}>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Emp Code
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.empcode}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                HQ
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                abc
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Name
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.empname}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Region
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.region}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* Camp Summary */}
        <Box mb={2} pl="15px">
          <Stack direction="row" spacing={2}>
            <Typography
              fontWeight="bold"
              color="#007AFF"
              fontFamily="GilroySemibold"
              fontSize="1.125rem"
            >
              Camp Summary
            </Typography>
            <Typography
              ml={6}
              display="flex"
              alignItems="center"
              fontSize="0.75rem"
              color="#BCBCC0"
              gap="5px"
              fontFamily="GilroySemibold"
            >
              <VisibilityIcon sx={{ color: "#BCBCC0", fontSize: "18px" }} />{" "}
              View Only
            </Typography>
          </Stack>
          <Grid container spacing={6} mt={1}>
            <Grid item xs={4}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Total Patients
                <br /> Screened
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.camp_total_patient}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Total Rx <br /> Generated
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.total_rx_generated}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                fontSize="0.9375rem"
                color="#707179"
                fontFamily="GilroyMedium"
              >
                Total Patient <br /> Report Uploaded
              </Typography>
              <Typography
                color="#4e4e55"
                fontSize="1.125rem"
                fontFamily="GilroySemibold"
              >
                {endDetails.total_report_generated}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button
            variant="outlined"
            sx={{
              background: "white",
              color: "#2B72E6",
              border: "1px solid #2B72E6",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEndSession}
            variant="contained"
            sx={{ background: "#2B72E6", color: "white" }}
          >
            End Session
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default EndSessionPage;
