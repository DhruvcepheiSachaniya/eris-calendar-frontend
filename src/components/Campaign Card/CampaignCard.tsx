import { Button } from "@mui/material";
import "./campaign-card.css";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaignName, campaignImage, campaignId }) => {
  const navigate = useNavigate();
  return (
    <div className="campaign-card-box">
      <img src={campaignImage} alt="" />
      <Button
        onClick={() => navigate(`/campaign?campaignId=${campaignId}`)}
        variant="contained"
        sx={{
          fontFamily: "GilroySemibold",
          position: "absolute",
          bottom: "5%",
          right: "5%",
          backgroundColor: "#2B72E6",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1f5dc2",
          },
        }}
      >
        View Campaign Details
      </Button>
    </div>
  );
};

export default CampaignCard;
