import authenticationSession from "../config/google.js";
import googleTokenSchema from "../models/GoogleToken.js";
import users from "../models/Users.js";

export const googleLogin = (req, res) => {
  try {
    const url = authenticationSession.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
      state: req.user.id,
    });

    res.status(200).json({ok:true, url });
  } catch (err) {
    console.error("Google Auth Error:");
    console.error(err);

    res.status(500).send(err.message);
  }
};

export const googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const userId = state;

    if (!code) {
      return res.status(400).send("Authorization code missing");
    }
    const { tokens } = await authenticationSession.getToken(code);
    authenticationSession.setCredentials(tokens);
    const update = {
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
      scope: tokens.scope,
      token_type: tokens.token_type,
    };
    if (tokens.refresh_token) {
      update.refresh_token = tokens.refresh_token;
    }
    await googleTokenSchema.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        ...update,
      },
      {
        upsert: true,
        new: true,
      },
    );
    await users.findByIdAndUpdate(userId, {
      googleConnected: true,
    });
    res.redirect("https://ai-event-automation.vercel.app/?google=success");
  } catch (err) {
    console.error(err);
    res.redirect("https://ai-event-automation.vercel.app/?google=failure");
  }
};
