import axios from "axios";

import pdfText from "pdf-text";
const extractTextFromPDF = async (url) => {
  try {
    const res = await axios({
      method: "GET",
      url,
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(res.data);
    return new Promise((resolve, reject) => {
      pdfText(buffer, (err, chunks) => {
        if (err) {
          reject("Error extracting text");
        } else {
          resolve(chunks.join(" "));
        }
      });
    });
  } catch (error) {
    console.error("PDF Processing Error:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

export default extractTextFromPDF;
