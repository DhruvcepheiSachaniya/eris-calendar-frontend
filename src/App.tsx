import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme/MuiTheme";
import Home from "./pages/Home/Home";
import Campaign from "./pages/Campaign/Campaign";
import PatientForm from "./pages/Patient Form/PatientForm";
import SessionPage from "./pages/Session/Session";
import EndSessionPage from "./pages/EndSession";
import ViewPatientPage from "./pages/ViewPatient/viewpatient";
import LoginPage from "./pages/Login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <Box>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/end" element={<EndSessionPage />} />
          <Route path="/view" element={<ViewPatientPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
