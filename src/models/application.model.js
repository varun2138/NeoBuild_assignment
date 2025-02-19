import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  education: [
    {
      degree: String,
      branch: String,
      institution: String,
      year: Number,
    },
  ],
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: String,
      endDate: String,
    },
  ],
  skills: [String],
  profileSummary: String,
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
