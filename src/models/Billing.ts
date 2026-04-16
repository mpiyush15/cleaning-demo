import mongoose, { Schema, Document } from "mongoose";

export interface IBilling extends Document {
  jobId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  assignedStaffName?: string;
  amount: number;
  serviceDate: Date;
  completionDate?: Date;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentMethod?: "cash" | "card" | "upi" | "bank_transfer";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BillingSchema = new Schema<IBilling>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    serviceName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    assignedStaffName: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    serviceDate: {
      type: Date,
      required: true,
    },
    completionDate: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer"],
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const BillingModel =
  mongoose.models.Billing ||
  mongoose.model<IBilling>("Billing", BillingSchema);

export default BillingModel;
