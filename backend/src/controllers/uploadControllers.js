import extractTextFromImage from "../services/ocrService.js";
import textExtraction from "../services/geminiService.js";
import Event from "../models/Event.js";
export const uploadImage = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "no file is selected" });
    }
    let allEvents = [];
    for (let file of files) {
      const extTextOcr = await extractTextFromImage(file.path);
      const formatedAItext = await textExtraction(extTextOcr);
      const eventData = {
        ...formatedAItext,
        user: req.user.id,
      };
      console.log(eventData);

      const savedEvent = await Event.create(eventData);
      allEvents.push(savedEvent);
      console.log("Event saved successfully:", savedEvent);
    }
    res.status(200).json({ ok: true, allEvents });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "Error occurred while processing the image",
      ok: false,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const Events = await Event.find({ user: req.user.id });
    res.status(200).json({ ok: true, Events });
  } catch (error) {
    res.status(404).json({ ok: true, error });
  }
};

export const DeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Event.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deletedItem) {
      res.status(404).json({ ok: false, message: "Id Not Found" });
    } else {
      res.status(200).json({ ok: true, message: "event deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, Error: error.message });
  }
};
