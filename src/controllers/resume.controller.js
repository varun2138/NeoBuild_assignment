import Application from "../models/application.model.js";
import extractTextFromPDF from "../utils/pdftoText.js";
import callGeminiAPI from "../utils/gemini.js";
import { encrypt } from "../utils/encryption.js";

const resumeConverter = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "PDF url is required" });
    }
    const text = await extractTextFromPDF(url);
    if (!text || text.trim().length === 0) {
      return res.status(500).json({ error: "Invalid or empty pdf file" });
    }

    const enrichedData = await callGeminiAPI(text);

    if (!enrichedData) {
      return res.status(500).json({ error: "Failed to process data with LLM" });
    }

    enrichedData.name = encrypt(enrichedData.name);
    enrichedData.email = encrypt(enrichedData.email);

    const newApplication = new Application(enrichedData);
    await newApplication.save();

    return res
      .status(200)
      .json({ message: "resume processed successfully", data: enrichedData });
  } catch (error) {
    console.error("resume processing error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export default resumeConverter;
