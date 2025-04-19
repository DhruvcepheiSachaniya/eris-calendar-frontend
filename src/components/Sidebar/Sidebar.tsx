import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <Box>
      {/* Menu Button */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
            pb: 5,
          }}
          role="presentation"
        >
          {/* Top Section: Close Button + Menu Options */}
          <Box>
            {/* Close Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Menu Heading */}
            <Typography
              variant="subtitle1"
              sx={{ mt: 2, mb: 1, fontWeight: 600 }}
            >
              Menu
            </Typography>

            {/* Menu Items */}
            <List>
              <ListItem button onClick={() => navigate("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItem>
            </List>
          </Box>

          {/* Bottom Section: Profile */}
          <Box sx={{ borderTop: "1px solid #ccc", pt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Profile
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Your Profile" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
