import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, required: true },
    customerId: { type: String, default: "" },
    customerName: { type: String, required: true },
    customerPhone: { type: String, default: "" },
    customerEmail: { type: String, default: "" },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, default: "" },
    status: { type: String, default: "Pending" },
    assignedStaffId: { type: String, default: null },
    assignedStaffName: { type: String, default: "" },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: false }
);

export default mongoose.models.Job || mongoose.model("Job", jobSchema);
