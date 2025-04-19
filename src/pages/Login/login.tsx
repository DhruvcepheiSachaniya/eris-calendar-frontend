import React from "react";
import axios from "axios";
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response);

      const { token, result } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_type", result["user_type"]);
        localStorage.setItem("emp_code", result.username);
        console.log("Token stored successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{ width: "50%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "80%",
            px: 8,
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#F37957",
              fontSize: "2.25rem",
              fontStyle: "bold",
              fontWeight: "500",
            }}
          >
            Log In to your account
          </Typography>

          <Typography
            sx={{
              color: "#8d8d8d",
              fontSize: "1.09rem",
              fontStyle: "bold",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Please Enter Your Employee Code and Password
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#3B82F6",
              fontWeight: "bold",
              mb: 1,
              mt: 5,
              alignSelf: "flex-start",
            }}
          >
            User Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Employee Code"
            sx={{ mb: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Typography
            variant="h6"
            sx={{
              color: "#3B82F6",
              fontWeight: "bold",
              mb: 1,
              alignSelf: "flex-start",
            }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="***************"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            to="#"
            sx={{
              color: "#ffffff",
              mb: 2,
              textTransform: "none",
              alignSelf: "flex-end",
            }}
          >
            Forgot Password?
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            onClick={handleLogin}
            sx={{ bgcolor: "#3B82F6", fontSize: "1rem", textTransform: "none" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Log In"}
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          width: "50%",
          backgroundColor: "#D4ECFC",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
        }}
      ></Grid>
    </Grid>
  );
};

export default LoginPage;
