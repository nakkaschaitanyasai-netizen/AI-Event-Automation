import "./index.css";
import Cookie from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
const EventCard = (props) => {
  const { event, deletedFunction } = props;
  const deleteEvent = () => {
    if (window.confirm("Do You want really Delete this event...?")) {
      deletedFunction(event._id);
    }
  };
  const addToCalendar = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}calendar/${event._id}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.ok) {
        alert("✅ Event added to Google Calendar");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("error", error.message);
      alert("Something went wrong");
    }
  };
  return (
    <div className="card">
      <div className="delete-container">
        <button className="delete-button" onClick={deleteEvent}>
          <DeleteIcon />
        </button>
      </div>
      <h1 className="eventName">{event.eventName}</h1>
      <p className="event">🕛 {event.eventTime}</p>
      <p className="event">📅 {event.eventDate}</p>
      <p className="event">⌛ {event.Duration}</p>
      <p className="description">{event.eventDescription}</p>
      <p className="location">📍 {event.eventLocation}</p>
      <div className="add-to-calendar-container">
        <button className="calendar-btn" onClick={addToCalendar}>
          Tap to G-Calendar
        </button>
      </div>
    </div>
  );
};
export default EventCard;
