import { google } from "googleapis";
import authenticationSession from "../config/google.js";
import moment from "moment";
import GoogleToken from "../models/GoogleToken.js";

const calendar = google.calendar({
  version: "v3",
  auth: authenticationSession,
});

export const createCalendarEvent = async (event) => {
  const tokens = await GoogleToken.findOne();

  if (!tokens) {
    throw new Error("Please login with Google first.");
  }
  authenticationSession.setCredentials(tokens)
  
  const start = moment(
    `${event.eventDate} ${event.eventTime}`,
    "DD MMM, YYYY hh:mm A",
  );
  const duration = parseInt(event.Duration.replace(/[^0-9]/g, "")) || 1;

  const end = start.clone().add(duration, "hours");

  const googleEvent = {
    summary: event.eventName,

    location: event.eventLocation,

    description: event.eventDescription,

    start: {
      dateTime: start.toISOString(),
      timeZone: "Asia/Kolkata",
    },

    end: {
      dateTime: end.toISOString(),
      timeZone: "Asia/Kolkata",
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: googleEvent,
  });

  return response.data;
};
