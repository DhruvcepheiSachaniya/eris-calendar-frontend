import { Button } from "@mui/material";
import "./campaign-card.css";

const CampaignCard = () => {
  return (
    <div className="campaign-card-box">
      <div className="campaign-image-box">Campaign 1 Image</div>
      <Button
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
