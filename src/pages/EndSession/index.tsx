import { Box, Button, Divider, Grid, Radio, RadioGroup, Stack, Typography, FormControlLabel } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";
import { getSessionEndDetails, endSession } from "../../../api.js";
import dayjs from "dayjs";

const EndSessionPage = () => {
    const [sessionData, setSessionData] = useState<any>(null);
    const [campExecuted, setCampExecuted] = useState("No");
    const [drKitDistributed, setDrKitDistributed] = useState("No");

    useEffect(() => {
        const sessionid = 28; // ideally from route param
        getSessionEndDetails(sessionid).then((data: any) => {
            if (data?.result) {
                setSessionData(data.result);
            }
        });
    }, []);

    const handleCampExecutedChange = (event: any) => {
        setCampExecuted(event.target.value);
    };

    const handleDrKitChange = (event: any) => {
        setDrKitDistributed(event.target.value);
    };

    const handleEndSession = async () => {
        const payload = {
            sessionid: sessionData.sessionId,
            cam_excecuted: campExecuted,
            kit_distributed: drKitDistributed
        };

        const result = await endSession(payload);
        console.log(result);
        // Show success/failure toast or navigate
    };

    if (!sessionData) return <Typography>Loading...</Typography>;

    return (
        <Box p={4}>
            {/* Breadcrumb */}
            <Stack direction="row" spacing={1} mb={1}>
                <Typography fontWeight={600} fontSize="20px" color="#455A64">{sessionData.drname}</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>•</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>{sessionData.speciality}</Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>
                    <ChevronRightIcon fontSize="large" />
                </Typography>
                <Typography fontSize="20px" color="#455A64" fontWeight={600}>End Session</Typography>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Section Title */}
            <Typography variant="h1" fontWeight={400} mb={3} color="#4E4E55">
                Final verifications before concluding the session
            </Typography>

            {/* Camp Details */}
            <Box mb={3}>
                <Typography color="#F37957" fontWeight="bold">Camp Details</Typography>
                <Grid container spacing={4} mt={1}>
                    <Grid item xs={4}>
                        <Typography fontWeight={600} fontSize={18} color="#707179">Camp Date</Typography>
                        <Typography fontWeight={400} color="#95969C" fontSize={'20px'}>
                            {dayjs(sessionData.campaignDate).format("DD/MM/YYYY")}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontWeight={600} fontSize={18} color="#707179">Camp Executed</Typography>
                        <RadioGroup row value={campExecuted} onChange={handleCampExecutedChange}>
                            <FormControlLabel value="Yes" control={<Radio sx={{ '&.Mui-checked': { color: '#2B72E6' } }} />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio sx={{ '&.Mui-checked': { color: '#2B72E6' } }} />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontWeight={600} fontSize={18} color="#707179">Dr. Kit Distributed</Typography>
                        <RadioGroup row value={drKitDistributed} onChange={handleDrKitChange}>
                            <FormControlLabel value="Yes" control={<Radio sx={{ '&.Mui-checked': { color: '#2B72E6' } }} />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio sx={{ '&.Mui-checked': { color: '#2B72E6' } }} />} label="No" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Doctor Details */}
            <Box mb={2}>
                <Stack direction="row" spacing={6}>
                    <Typography fontWeight="bold" color="#007AFF">Doctor Details</Typography>
                    <Typography display="flex" alignItems="center" fontSize="12px" color="#BCBCC0" gap="5px">
                        <VisibilityIcon sx={{ color: "#BCBCC0", fontSize: "18px" }} /> View Only
                    </Typography>
                </Stack>
                <Grid container spacing={8} mt={1}>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#707179">Reg. Code</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.drcode}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#707179">Division</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.division}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#707179">Name</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.drname}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#707179">Specialty</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.speciality}</Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Employee Details */}
            <Box mb={2}>
                <Stack direction="row" spacing={6}>
                    <Typography fontWeight="bold" color="#007AFF">Employee Details</Typography>
                    <Typography display="flex" alignItems="center" fontSize="12px" color="#BCBCC0" gap="5px">
                        <VisibilityIcon sx={{ color: "#BCBCC0", fontSize: "18px" }} /> View Only
                    </Typography>
                </Stack>
                <Grid container spacing={8} mt={1}>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#607D8B">Emp Code</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.empcode}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#607D8B">HQ</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.division}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#607D8B">Name</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.empname}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={15} color="#607D8B">Region</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.region}</Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Camp Summary */}
            <Box mb={2}>
                <Stack flexDirection="row">
                    <Typography fontWeight="bold" color="#007AFF">Camp Summary</Typography>
                    <Typography ml={6} display="flex" alignItems="center" fontSize="12px" color="#BCBCC0" gap="5px">
                        <VisibilityIcon sx={{ color: "#BCBCC0", fontSize: "18px" }} /> View Only
                    </Typography>
                </Stack>
                <Grid container spacing={6} mt={1}>
                    <Grid item xs={4}>
                        <Typography fontSize={15} color="#607D8B">Total Patients<br /> Screened</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.camp_total_patient}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontSize={15} color="#607D8B">Total Rx <br /> Generated</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.total_rx_generated}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontSize={15} color="#607D8B">Total Patient <br /> Report Uploaded</Typography>
                        <Typography fontWeight={600} fontSize="20px">{sessionData.total_report_generated}</Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                <Button variant="outlined" sx={{ background: "white", color: "#2B72E6", border: "1px solid #2B72E6" }}>Cancel</Button>
                <Button variant="contained" sx={{ background: "#2B72E6", color: 'white' }} onClick={handleEndSession}>
                    End Session
                </Button>
            </Stack>
        </Box>
    );
};

export default EndSessionPage;
