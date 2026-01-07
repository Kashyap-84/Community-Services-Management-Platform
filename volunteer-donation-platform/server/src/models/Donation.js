import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "USD" },
    note: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", DonationSchema);
