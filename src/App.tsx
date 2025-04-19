import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/MuiTheme";
import Home from "./pages/Home/Home";
import Campaign from "./pages/Campaign/Campaign";
import PatientForm from "./pages/Patient Form/PatientForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionPage from "./pages/Session/Session";
import EndSessionPage from "./pages/EndSession";
import ViewPatientPage from "./pages/ViewPatient/viewpatient";
import PerSessionPage from "./pages/Session/PerSession";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Campaign />}></Route>
          <Route path="/session" element={<SessionPage />}></Route>
          <Route path="/patient-form" element={<PatientForm />}></Route>
          <Route path="/end" element={<EndSessionPage />}></Route>
          <Route path="/view" element={<ViewPatientPage />}></Route>
          <Route path="/session-page" element={<PerSessionPage />}></Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
