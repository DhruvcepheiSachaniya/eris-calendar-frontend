import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import LogoutBar from "../../components/Logout Bar/LogoutBar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { registerPatient } from "../../../api.js";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const [patientDetails, setPatientDetails] = useState({
    code: generateSixDigitCode(),
    name: "",
    age: "",
    gender: "",
    prescriptionFile: null,
    reportFile: null,
  });
  const [searchParams] = useSearchParams();
  const drCode = searchParams.get("drCode");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  console.log(patientDetails);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPatientDetails((prev) => ({
        ...prev,
        [key]: { file, url: fileUrl, type: file.type },
      }));
    }
  };

  const handleSubmitPatient = async () => {
    try {
      setIsButtonLoading(true);
      const response = await registerPatient({
        patientcode: patientDetails.code,
        name: patientDetails.name,
        age: patientDetails.age,
        gender: patientDetails.gender,
        drcode: drCode,
        pre_img: patientDetails.prescriptionFile.file,
        rep_img: patientDetails.reportFile.file,
      });
      if (response.status) {
        toast.success("Patient Added Successfully");
        navigate(`/session?sessionid=${response.data.sessionInfo.id}`);
        console.log(response);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const renderFilePreview = (fileObj) => {
    if (!fileObj) return null;
    if (fileObj.type === "application/pdf") {
      return (
        <iframe
          src={fileObj.url}
          title="PDF Preview"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      );
    } else {
      return (
        <img
          src={fileObj.url}
          alt="Preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      );
    }
  };

  return (
    <div className="patient-form-container">
      <LogoutBar />

      {/* Doctor Info */}
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
          Dr. Smith
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

      <Box sx={{ p: 3, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
          {[
            {
              label: "Patient Code",
              name: "code",
              value: patientDetails.code,
              readOnly: true,
              placeholder: "",
              type: "text",
            },
            {
              label: "Patient Name",
              name: "name",
              value: patientDetails.name,
              readOnly: false,
              placeholder: "Enter patient name",
              type: "text",
            },
            {
              label: "Age",
              name: "age",
              value: patientDetails.age,
              readOnly: false,
              placeholder: "Enter age",
              type: "number",
            },
          ].map((field) => (
            <Box key={field.name} sx={{ flex: 1, minWidth: 200 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: "GilroySemiBold",
                  fontSize: "1.25rem",
                  color: "#707179",
                }}
              >
                {field.label}
              </Typography>
              <TextField
                name={field.name}
                type={field.type}
                value={field.value}
                placeholder={field.placeholder}
                onChange={handleInputChange}
                fullWidth
                InputProps={{ readOnly: field.readOnly }}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "GilroySemiBold",
                    "& fieldset": { borderColor: "#E5E7EB" },
                    "&:hover fieldset": { borderColor: "#D1D5DB" },
                    "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                  },
                }}
              />
            </Box>
          ))}

          {/* Gender */}
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography
              sx={{
                mb: 1,
                fontFamily: "GilroySemiBold",
                fontSize: "1.25rem",
                color: "#707179",
              }}
            >
              Gender
            </Typography>
            <TextField
              select
              name="gender"
              value={patientDetails.gender}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontFamily: "GilroySemiBold",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                  "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                },
              }}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Upload Boxes */}
        {/* Upload Boxes */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
          {/* Prescription Upload */}
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              sx={{
                mb: 1,
                fontFamily: "GilroySemiBold",
                fontSize: "1.25rem",
                color: "#707179",
              }}
            >
              Prescription Upload
            </Typography>
            <Box
              sx={{
                border: "2px dashed #E0E0E0",
                borderRadius: "0.5rem",
                height: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}
              onClick={() =>
                document.getElementById("prescription-input").click()
              }
            >
              {patientDetails.prescriptionFile ? (
                <Box sx={{ width: "100%", height: "100%" }}>
                  {renderFilePreview(patientDetails.prescriptionFile)}
                </Box>
              ) : (
                <Box textAlign="center">
                  <AddCircleIcon sx={{ color: "orange", fontSize: 40 }} />
                  <Typography
                    sx={{ color: "#64748B", fontSize: "0.9rem", mt: 1 }}
                  >
                    Browse or upload Patient’s Medical Prescription
                  </Typography>
                </Box>
              )}
              <input
                type="file"
                id="prescription-input"
                accept="image/*,.pdf"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "prescriptionFile")}
              />
            </Box>
          </Box>

          {/* Report Upload */}
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography
              sx={{
                mb: 1,
                fontFamily: "GilroySemiBold",
                fontSize: "1.25rem",
                color: "#707179",
              }}
            >
              Report Upload
            </Typography>
            <Box
              sx={{
                border: "2px dashed #E0E0E0",
                borderRadius: "0.5rem",
                height: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}
              onClick={() => document.getElementById("report-input").click()}
            >
              {patientDetails.reportFile ? (
                <Box sx={{ width: "100%", height: "100%" }}>
                  {renderFilePreview(patientDetails.reportFile)}
                </Box>
              ) : (
                <Box textAlign="center">
                  <AddCircleIcon sx={{ color: "#3B82F6", fontSize: 40 }} />
                  <Typography
                    sx={{ color: "#64748B", fontSize: "0.9rem", mt: 1 }}
                  >
                    Browse or upload Patient’s Medical Report
                  </Typography>
                </Box>
              )}
              <input
                type="file"
                id="report-input"
                accept="image/*,.pdf"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "reportFile")}
              />
            </Box>
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              color: "#3B82F6",
              borderColor: "#3B82F6",
              fontFamily: "GilroySemiBold",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPatient}
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              fontFamily: "GilroySemiBold",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
          >
            {isButtonLoading ? <CircularProgress /> : "Save Patient"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PatientForm;

function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000);
}
