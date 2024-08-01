import { User } from "../../../../models/userModel";
import { Store } from "../../../../models/storeModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  await connectDB();

  try {
    const profileImg = await Store.find({ ownerEmail: email });
    const userData = await User.find({ email: email });

    return NextResponse.json(profileImg);
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
