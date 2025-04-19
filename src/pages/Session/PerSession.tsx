import { Box, Typography } from "@mui/material";
import LogoutBar from "../../components/Logout Bar/LogoutBar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PatientTable from "../../components/Table/Table";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getPatientList } from "../../../api.js";
import Card from "../../components/Card/Card.js";

const PerSessionPage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionid = searchParams.get("sessionid");
  const drcode = searchParams.get("drcode");
  const [patientList, setPatientList] = useState([]);
  const [doctor, setDoctor] = useState({ code: "", name: "", speciality: "" });
  const navigate = useNavigate();
  const [totalPatient, setTotalPatient] = useState(0);
  const [totalPre, setTotalPre] = useState(0);
  const [totalRep, setTotalRep] = useState(0);

  const fetchPatientList = async (sessionid) => {
    try {
      setIsPageLoading(true);
      const response = await getPatientList(sessionid);
      if (response.status) {
        setPatientList(response.find_session.patients);
        setTotalPatient(response.patientCount);
        setTotalPre(response.pre_count);
        setTotalRep(response.rep_count);
        setDoctor({
          code: response.find_session.dr_code,
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
  return (
    <>
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
              Cardiology
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
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
        >
          <Card heading={"Total Patient"} value={totalPatient} />
          <Card heading={"Total Patient Reports"} value={totalRep} />
          <Card heading={"Total Rx Uploaded"} value={totalRep} />
        </Box>
        <PatientTable patientList={patientList} View={"yes"} drcode={drcode || doctor.name} />
      </div>
    </>
  );
};

export default PerSessionPage;
