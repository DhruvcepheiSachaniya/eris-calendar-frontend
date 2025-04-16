import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  add,
  startOfDay,
  setHours,
} from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Popover, Button, Box, Typography, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./calendar.css";
import SessionModal from "../Session Popup/Session";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Dr. Shruti Sharma\nOncology",
    start: new Date("2025-04-15T13:00:00"),
    end: new Date("2025-04-15T16:00:00"),
  },
];

const eventStyleGetter = () => ({
  style: {
    background: "rgba(51, 126, 137, 0.1)",
    border: "1px solid rgba(51, 126, 137, 0.5)",
    borderRadius: "0.25rem",
    padding: "6px 10px",
    color: "#005e67",
    fontWeight: 600,
    fontSize: "0.9rem",
    whiteSpace: "pre-line",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
});

const BigCalendar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openSessionModal, setOpenSessionModal] = useState(false);

  const handleClose = () => {
    setOpenSessionModal(false);
  };

  const handleCalendarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateChange = (date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    setSelectedDate(monday);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ padding: "1rem", fontFamily: "GilroySemibold, sans-serif" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <Button
          onClick={handleCalendarClick}
          endIcon={<ExpandMoreIcon />}
          sx={{
            color: "#455A64",
            fontFamily: "GilroySemiBold",
            fontSize: "1.5rem",
          }}
        >
          {format(selectedDate, "MMMM yyyy")}
        </Button>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box p={2}>
            <Typography fontWeight={600} fontSize="1rem" marginBottom={1}>
              Select Week
            </Typography>
            <DateCalendar
              date={selectedDate}
              onChange={handleDateChange}
              views={["day"]}
            />
          </Box>
        </Popover>
        <Button
          variant="contained"
          sx={{
            fontFamily: "GilroySemibold",
            backgroundColor: "#2B72E6",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1f5dc2",
            },
          }}
          onClick={() => setOpenSessionModal(true)}
        >
          + Schedule Session
        </Button>
      </Box>

      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          view="week"
          date={selectedDate}
          onNavigate={setSelectedDate}
          views={["week"]}
          step={60}
          timeslots={1}
          formats={{
            eventTimeRangeFormat: () => "",
            timeGutterFormat: (date) => format(date, "HH:mm"),
          }}
          min={setHours(startOfDay(new Date()), 8)}
          max={setHours(startOfDay(new Date()), 18)}
          components={{
            toolbar: () => null,
            event: ({ event }) => {
              const [doctor, specialization] = event.title.split("\n");
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#337E89",
                    }}
                  >
                    {doctor}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#888" }}>
                    {specialization}
                  </div>
                </div>
              );
            },
          }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <SessionModal open={openSessionModal} handleClose={handleClose} />
    </div>
  );
};

export default BigCalendar;
