import { Component } from "react";
import "./index.css";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import EventCard from "../EventCard";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookie from "js-cookie";

class HomePage extends Component {
  state = {
    Image: [],
    success: false,
    Events: [],
    loading: false,
    googleAuth: false,
  };
  getEventsFunction = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    };
    const url = `${import.meta.env.VITE_API_URL}api/events`;
    const response = await fetch(url, options);
    const data = await response.json();
    this.setState({ Events: data.Events });
  };
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    const status = params.get("google");
    if (status === "success") {
      this.setState({ googleAuth: true });
      this.getEventsFunction();
    } else if (status === "failure") {
      this.setState({ googleAuth: false });
    }
  }
  deletedFunction = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      };
      const url = `${import.meta.env.VITE_API_URL}api/events/${id}`;
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.ok) {
        this.setState((prevState) => ({
          Events: prevState.Events.filter((event) => event._id !== id),
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  logOutFunction = () => {
    Cookie.remove("token");
    window.location.href = "/";
  };
  render() {
    const { Image, success, Events, loading, googleAuth } = this.state;
    return (
      <div className="container1">
        {loading ? (
          <div className="loading-home-page">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        ) : (
          <div className="home-page">
            <div className="logout-container">
              <button
                className="google-btn"
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `${import.meta.env.VITE_API_URL}auth/google`,
                      {
                        headers: {
                          Authorization: `Bearer ${Cookie.get("token")}`,
                        },
                      },
                    );
                    const data = await response.json();

                    window.location.href = data.url;
                  } catch (err) {
                    console.error("Error during Google login:", err);
                    alert("Google login failed. Please try again.");
                  }
                }}
              >
                {googleAuth ? " Google account connected" : "Login with Google"}
              </button>
              <button className="logout-button" onClick={this.logOutFunction}>
                <LogoutIcon></LogoutIcon> Log out
              </button>
            </div>
            <div className="heading-container">
              <div className="image-container">
                <img
                  className="schedule-image"
                  src="https://res.cloudinary.com/dcdtpe8rh/image/upload/fl_preserve_transparency/v1783183913/2066591828bf38587cb5c68efeab9c0e-removebg-preview_yml8fc.jpg?_s=public-apps"
                  alt=" time schedule"
                />
              </div>
              <div className="text-container">
                <h1 className="heading">Stay Prepared </h1>
                <h2 className="heading2">
                  Set Reminders on your FingerTips using{" "}
                  <span className="highlight"> MCP</span>
                </h2>

                <div>
                  {!Image[0] ? (
                    <label className="upload-button">
                      <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                          this.setState({
                            Image: [...e.target.files],
                            success: false,
                          });
                        }}
                      />
                      <UploadRoundedIcon className="upload-icon" />
                      <h1 className="upload-text">Upload</h1>
                    </label>
                  ) : (
                    <div className="upload-button">
                      <div className="reminder-container">
                        <div className="reminder-button">
                          <SpatialAudioOffIcon className="reminder-icon" />
                          <h1
                            onClick={async () => {
                              this.setState({ loading: true });
                              const formData = new FormData();
                              this.state.Image.forEach((file) => {
                                formData.append("images", file);
                              });
                              const options = {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${Cookie.get("token")}`,
                                },
                                body: formData,
                              };
                              const url = `${import.meta.env.VITE_API_URL}api/upload`;
                              const response = await fetch(url, options);
                              const data = await response.json();
                              if (data.ok) {
                                this.setState((prevState) => ({
                                  success: true,
                                  Image: "",
                                  loading: false,
                                  Events: [
                                    ...prevState.Events,
                                    ...data.allEvents,
                                  ],
                                }));
                              } else {
                                alert("Please provide Valid Image");
                                this.setState({
                                  loading: false,
                                  success: false,
                                  Image: [],
                                });
                              }
                            }}
                            className="reminder-text"
                          >
                            {"Set Reminder"}
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                  {success && (
                    <p
                      className="success-message"
                      style={{ marginTop: "15px", textAlign: "center" }}
                    >
                      You wanna upload another Event...? 🤔
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container-2">
          {Array.isArray(Events) &&
            Events.map((value) => (
              <EventCard
                key={value._id}
                event={value}
                deletedFunction={this.deletedFunction}
              />
            ))}
        </div>
      </div>
    );
  }
}
export default HomePage;
