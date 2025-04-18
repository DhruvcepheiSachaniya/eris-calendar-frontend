import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const PatientTable = ({ patientList }) => {
  const rows = patientList.map((patient) => ({
    code: patient.patient_code,
    name: patient.patient_name,
    age: patient.patient_age,
    gender: patient.patient_gender,
  }));
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 2, boxShadow: "none", paddingLeft: "20px" }}
    >
      <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <TableHead>
          <TableRow>
            {["Patient Code", "Patient Name", "Age", "Gender", "Action"].map(
              (head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: "#64748B",
                    fontFamily: "GilroyMedium",
                    fontSize: "1.25rem",
                    borderBottom: "1px solid #E7EAEE",
                  }}
                >
                  {head}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ borderBottom: "1px solid #E7EAEE" }}>
              <TableCell
                sx={{
                  color: "#191d23",
                  fontFamily: "GilroyMedium",
                  fontSize: "1rem",
                  borderBottom: "1px solid #E7EAEE",
                }}
              >
                {row.code}
              </TableCell>
              <TableCell
                sx={{
                  color: "#191d23",
                  fontFamily: "GilroyMedium",
                  fontSize: "1rem",
                  borderBottom: "1px solid #E7EAEE",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{
                  color: "#191d23",
                  fontFamily: "GilroyMedium",
                  fontSize: "1rem",
                  borderBottom: "1px solid #E7EAEE",
                }}
              >
                {row.age}
              </TableCell>
              <TableCell
                sx={{
                  color: "#191d23",
                  fontFamily: "GilroyMedium",
                  fontSize: "1rem",
                  borderBottom: "1px solid #E7EAEE",
                }}
              >
                {row.gender}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #E7EAEE",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#E7EAEE",
                    color: "#64748B",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#E7EAEE",
                      boxShadow: "none",
                    },
                  }}
                >
                  Edit Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
