// import { useParams } from "next/navigation";
import { Reservation } from "../../../../models/reservationModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
export async function POST(request) {
  const reservationDetails = await request.json();
  try {
    await connectDB();
    const newReservation = new Reservation(reservationDetails);

    await newReservation.save();
    return NextResponse.json(
      { confirmation: "success", data: JSON.stringify(newPrompt) },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { confirmation: "fail", error: error.message },
      { status: 500 }
    );
  }
}
