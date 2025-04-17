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

  const fetchCampaigns = async () => {
    try {
      setIsPageLoading(true);
      const response = await getCampaignList();
      if (response.status) {
        setCampaigns(response.all_campaign);
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
    fetchCampaigns();
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
        <Card heading="Schedule/Target Sessions" value="20/30" />
        <Card heading="Associated/Target Doctors" value="12/24" />
        <Card heading="Sessions Completed" value="15" />
        <Card heading="Total Patients" value="50" />
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
