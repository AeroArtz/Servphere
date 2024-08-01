import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
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
  },
  { timestamps: true }
);

export const Booking =
  mongoose.models?.Booking || mongoose.model("Booking", bookingSchema);
