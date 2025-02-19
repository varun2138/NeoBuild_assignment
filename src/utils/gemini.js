import axios from "axios";

const callGeminiAPI = async (text) => {
  try {
    const response = await axios.post(
      `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Extract structured resume information from the following text and return only a **pure JSON object**. 
Do **not** include any additional formatting, markdown, or backticks. The response should contain **only** the JSON object and nothing else. 

The JSON should strictly follow this structure:

{
  "name": "Full Name",
  "email": "Email Address",
  "education": [
    {
      "degree": "Degree Name",
      "branch": "Branch of Study",
      "institution": "Institution Name",
      "year": Year of Completion
    }
  ],
  "experience": [
    {
      "jobTitle": "Job Title",
      "company": "Company Name",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD or Present"
    }
  ],
  "skills": ["List of Skills"],
  "profileSummary": "Brief summary about the candidate from career objective and based on resume details"
}

Return **only the JSON object** with no extra text, explanation, or markdown formatting. 

Now, process the following resume text:

"${text}"`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 700,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let jsonString = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!jsonString || jsonString.trim() === "") {
      throw new Error("Invalid response format: No valid data found.");
    }

    jsonString = jsonString.replace(/```json|```/g, "").trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default callGeminiAPI;
