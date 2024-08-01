import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: Date,
    },
    timeSlot: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    reservationStatus: {
      type: String,
      enum: ["Pending", "Successful", "Canceled", "Expired", "Failed"],
    },
  },
  { timestamps: true }
);

export const Reservation =
  mongoose.models?.Reservation ||
  mongoose.model("Reservation", reservationSchema);
