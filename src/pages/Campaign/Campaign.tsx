import "./campaign.css";
import BigCalendar from "../../components/Calendar/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LogoutBar from "../../components/Logout Bar/LogoutBar";
import Card from "../../components/Card/Card";
import SessionModal from "../../components/Session Popup/Session";
import { useState } from "react";
const Campaign = () => {
  
  return (
    <div className="campaign-container">
      <LogoutBar />
      <div className="cards">
        <Card heading="Schedule Sessions" value="30" />
        <Card heading="Associated Doctors" value="24" />
        <Card heading="Sessions Completed" value="15" />
        <Card heading="Total Patients" value="50" />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BigCalendar />
      </LocalizationProvider>
    </div>
  );
};

export default Campaign;
