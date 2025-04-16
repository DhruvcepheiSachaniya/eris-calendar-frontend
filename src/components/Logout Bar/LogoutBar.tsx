import dot from "../../../assets/Dot.png";
import "./logout-bar.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const LogoutBar = () => {
  return (
    <div className="logout-bar">
      <Sidebar />
      <div className="logout-button">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LogoutBar;
