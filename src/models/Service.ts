import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    duration: { type: String, default: "" },
    image: { type: String, default: "" },
    popular: { type: Boolean, default: false },
  },
  { timestamps: false }
);

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
