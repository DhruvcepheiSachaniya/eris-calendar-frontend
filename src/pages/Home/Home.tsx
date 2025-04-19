import "./home.css";
import Card from "../../components/Card/Card";
import LogoutBar from "../../components/Logout Bar/LogoutBar";
import CampaignCard from "../../components/Campaign Card/CampaignCard";
import SessionModal from "../../components/Schedule Session Popup/Session.js";
import { getCampaignList } from "../../../api.js";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const Home = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsStats, setCampaignsStats] = useState({});
  const emp_code = localStorage.getItem("emp_code");

  const fetchCampaigns = async (empCode) => {
    try {
      setIsPageLoading(true);
      const response = await getCampaignList(empCode);
      if (response.status) {
        setCampaigns(response.all_campaign);
        setCampaignsStats(response.stats);
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
    fetchCampaigns(emp_code);
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
    <div className="home-container">
      <LogoutBar />
      <div className="cards">
        <Card
          heading="Schedule/Target Sessions"
          value={`${campaignsStats.scheduled_sessions}/${campaignsStats.targeted_sessions}`}
        />
        <Card
          heading="Associated/Target Doctors"
          value={`${campaignsStats.associated_doctor}/${campaignsStats.targeted_doctors}`}
        />
        <Card
          heading="Sessions Completed"
          value={`${campaignsStats.session_completed}`}
        />
        <Card
          heading="Total Patients"
          value={`${campaignsStats.total_patients}`}
        />
      </div>
      <div className="campaigns">
        <p className="campaign-heading">Ongoing Campaigns</p>
        <div className="campaigns-grid">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaignName={campaign.name}
              campaignImage={campaign.campaign_img}
              campaignId={campaign.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
