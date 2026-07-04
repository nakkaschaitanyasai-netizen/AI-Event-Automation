import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },

    eventDate: {
      type: String,
      required: true,
    },

    eventTime: {
      type: String,
      required: true,
    },

    eventLocation: {
      type: String,
      default: "",
    },

    eventDescription: {
      type: String,
      default: "",
    },

    Duration: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);