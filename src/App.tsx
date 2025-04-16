import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/MuiTheme";
import Home from "./pages/Home/Home";
import Campaign from "./pages/Campaign/Campaign";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Campaign />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
