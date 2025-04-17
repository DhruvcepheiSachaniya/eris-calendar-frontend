import "./campaign.css";
import BigCalendar from "../../components/Calendar/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LogoutBar from "../../components/Logout Bar/LogoutBar";
import Card from "../../components/Card/Card";
import { useSearchParams } from "react-router-dom";
import { getCampaignDetails } from "../../../api.js";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const Campaign = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaignId");

  const fetchCampaignDetails = async (campaignId) => {
    try {
      setIsPageLoading(true);
      const response = await getCampaignDetails(campaignId);
      if (response.status) {
        console.log(response);
        setCampaignDetails(response);
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
    fetchCampaignDetails(campaignId);
  }, [refreshTrigger]);

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
    <div className="campaign-container">
      <LogoutBar />
      <h1 className="campaign-heading">Campaign 1</h1>
      <div className="cards">
        <Card
          heading="Schedule Sessions"
          value={campaignDetails.scheduled_sessions}
        />
        <Card
          heading="Associated Doctors"
          value={campaignDetails.associated_doctor}
        />
        <Card
          heading="Sessions Completed"
          value={campaignDetails.session_completed}
        />
        <Card heading="Total Patients" value={campaignDetails.total_patients} />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BigCalendar
          campaignDetails={campaignDetails}
          setRefreshTrigger={setRefreshTrigger}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Campaign;
