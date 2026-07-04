import mongoose from "mongoose";
const googleTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    default: "",
  },
  scope: {
    type: String,
  },
  token_type: {
    type: String,
  },
  expiry_date: {
    type: Number,
  },
});
export default mongoose.model("GoogleToken", googleTokenSchema);
