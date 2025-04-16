import "./home.css";
import Card from "../../components/Card/Card";
import LogoutBar from "../../components/Logout Bar/LogoutBar";
import CampaignCard from "../../components/Campaign Card/CampaignCard";
import SessionModal from "../../components/Session Popup/Session";
import { useState } from "react";
import { addSession } from "../../../../eris-calendar-frontend/api.js";
const Home = () => {
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
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
