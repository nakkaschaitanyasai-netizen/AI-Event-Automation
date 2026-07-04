import genAI from "../config/gemini.js";

const textExtraction = async (ocrText) => {
  try {
    const prompt = `you are a agent that are extract event information from the following text: ${ocrText}.
        Please provide the extracted information in a structured format.
        in JSON format with the following fields: id, eventName, eventDate, eventTime, eventLocation, eventDescription, Duration. 
        If any of the fields are not present in the text,
        please return them as empty strings.`;
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const Text= response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
    return JSON.parse(Text);
  } catch (e) {
    return e.message;
  }
};
export default textExtraction;
