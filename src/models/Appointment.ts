import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, default: "" },
    status: { type: String, default: "Pending" },
    assignedStaffId: { type: Number, default: null },
    assignedStaffName: { type: String, default: "" },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: false }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
