import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.models.Staff || mongoose.model("Staff", staffSchema);
