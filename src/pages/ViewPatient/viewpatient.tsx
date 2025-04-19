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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPatientDetails } from "../../../api.js";

const ViewPatientPage = () => {
    const location = useLocation();
    const patientCode = location?.state?.patientcode;
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
        <Box p={4}>
            {/* Breadcrumb */}
            <Stack direction="row" spacing={1} mb={1}>
                <Typography fontWeight={600} fontSize="20px" color="#455A64">Dr. Shruti Sharma</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>•</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>Cardiologist</Typography>
                <ChevronRightIcon fontSize="large" />
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>Patient details</Typography>
            </Stack>

            {/* Title and View Only */}
            <Box display="flex" alignItems="center" mb={2} gap={5}>
                <Typography variant="h6" fontWeight={600} fontSize={"18px"} color="#007AFF">
                    Patient Details
                </Typography>
                <Typography fontSize={"12px"} color="#BCBCC0">
                    👁 View Only
                </Typography>
            </Box>

            {/* Patient Info Grid */}
            <Grid container spacing={8} mb={4}>
                {[{
                    label: "Patient Code", value: patientCode
                }, {
                    label: "Patient name", value: patient?.name
                }, {
                    label: "Age", value: patient?.age
                }, {
                    label: "Gender", value: patient?.gender
                }].map((item, idx) => (
                    <Grid item xs={6} sm={3} key={idx}>
                        <Typography fontSize={"15px"} color="#707179">
                            {item.label}
                        </Typography>
                        <Typography fontSize={"18px"} fontWeight={500} color="#4E4E55">
                            {item.value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Report & Prescription */}
            <Grid container spacing={3}>
                {/* Prescription */}
                <Grid item xs={12} md={6}>
                    <Typography fontSize={"20px"} color="#707179" gutterBottom>
                        Patient’s Prescription (Rx)
                    </Typography>
                    <Card
                        variant="outlined"
                        sx={{
                            border: "2px solid #F37957",
                            borderRadius: "4px",
                            width: "500px",
                            height: "100%",
                        }}
                    >
                        <CardContent>
                            <CardMedia
                                component="img"
                                height="220"
                                image={patient?.prescription_img}
                                alt="Prescription"
                                sx={{ opacity: 0.4, objectFit: "contain" }}
                            />
                            <Box mt={2} display="flex" justifyContent="center">
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
                        </CardContent>
                    </Card>
                </Grid>

                {/* Report */}
                <Grid item xs={12} md={6}>
                    <Typography fontSize={"20px"} color="#707179" gutterBottom>
                        Patient’s Report
                    </Typography>
                    <Card
                        variant="outlined"
                        sx={{
                            border: "2px solid #2B72E6",
                            borderRadius: "4px",
                            width: "500px",
                            height: "100%",
                        }}
                    >
                        <CardContent>
                            <CardMedia
                                component="iframe"
                                height="220"
                                src={patient?.report_img}
                                sx={{ opacity: 0.4 }}
                            />
                            <Box mt={2} display="flex" justifyContent="center">
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Session Details Button */}
            <Box display="flex" justifyContent="flex-end" mt={8}>
                <Button
                onClick={() => navigate(-1)} 
                variant="contained" sx={{ background: '#2B72E6', color: 'white' }} size="large">
                    <ArrowBackIosIcon /> Session Details
                </Button>
            </Box>
        </Box>
    );
};

export default ViewPatientPage;
