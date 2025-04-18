import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ViewPatientPage = () => {
    return (
        <Box p={4}>
            {/* Breadcrumb */}
            <Stack direction="row" spacing={1} mb={1}>
                <Typography fontWeight={600} fontSize="20px" color="#455A64">Dr. Shruti Sharma</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>•</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>Cardiologist</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>
                    <ChevronRightIcon fontSize="large" />
                </Typography>
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
                {[
                    { label: "Patient Code", value: "32589742" },
                    { label: "Patient name", value: "Dev Mehta" },
                    { label: "Age", value: "32" },
                    { label: "Gender", value: "Male" },
                ].map((item, idx) => (
                    <Grid item xs={6} sm={3} key={idx}>
                        <Typography variant="h2" fontSize={"15px"} fontWeight={400} color="#707179">
                            {item.label}
                        </Typography>
                        <Typography variant="h1" fontSize={"18px"} fontWeight={500} color="#4E4E55">{item.value}</Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Report & Prescription */}
            <Grid container spacing={3}>
                {/* Prescription */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" fontSize={"20px"} fontWeight={400} color="#707179" gutterBottom>
                        Patient’s Prescription (Rx)
                    </Typography>
                    <Card
                        variant="outlined"
                        sx={{
                            borderColor: "#F37957",
                            border: "2px solid #F37957",
                            borderRadius: "4px",
                            height: "100%",
                            width: "500px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardContent>
                            <CardMedia
                                component="img"
                                height="220"
                                image="/placeholder/prescription.png" // Replace with actual URL
                                alt="Prescription"
                                sx={{ opacity: 0.4, objectFit: "contain" }}
                            />
                            <Box mt={2} display="flex" justifyContent="center">
                                <Button
                                    variant="outlined"
                                    sx={{ background: "#FCE7E3", color: "#F37957"}}
                                    startIcon={<VisibilityIcon />}
                                >
                                    View full Image
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Report */}
                <Grid item xs={12} md={6}>
                    <Typography  variant="h2" fontSize={"20px"} fontWeight={400} color="#707179" gutterBottom>
                        Patient’s Report
                    </Typography>
                    <Card
                        variant="outlined"
                        sx={{
                            borderColor: "#2B72E6",
                            border: "2px solid #2B72E6",
                            borderRadius: "4px",
                            height: "100%",
                            width: "500px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardContent>
                            <CardMedia
                                component="img"
                                height="220"
                                image="/placeholder/report.png" // Replace with actual URL
                                alt="Report"
                                sx={{ opacity: 0.4, objectFit: "contain" }}
                            />
                            <Box mt={2} display="flex" justifyContent="center">
                                <Button
                                    variant="outlined"
                                    sx={{ color: "#2B72E6", background: "#78A5FE40"}}
                                    startIcon={<VisibilityIcon />}
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
                <Button variant="contained" sx={{ background: '#2B72E6', color: 'white' }} size="large">
                    <ArrowBackIosIcon /> Session Details
                </Button>
            </Box>
        </Box>
    );
};

export default ViewPatientPage;
