import { Reservation } from "../../../../../models/reservationModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
export async function PUT(request, { params }) {
  const reservationId = params.id;
  return NextResponse.json({ message: "success", reservationId });
}
