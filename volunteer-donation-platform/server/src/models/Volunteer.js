import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String, default: "" },
    skills: [{ type: String }],
    availability: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
