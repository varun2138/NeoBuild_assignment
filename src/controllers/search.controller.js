import Application from "../models/application.model.js";
import { decrypt } from "../utils/encryption.js";

const searchProfile = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const applications = await Application.find({});
    const searchTerm = name.toLowerCase();

    const filteredApplications = applications
      .map((app) => ({
        ...app._doc,
        name: decrypt(app.name),
        email: decrypt(app.email),
      }))
      .filter((app) => {
        const nameTokens = app.name.toLowerCase().split(" ");
        return nameTokens.some((token) => token.includes(searchTerm));
      });

    if (!filteredApplications.length) {
      return res.status(404).json({ error: "No matching resumes found" });
    }
    return res.status(200).json({
      message: "data retrieved successfully",
      results: filteredApplications,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export default searchProfile;
