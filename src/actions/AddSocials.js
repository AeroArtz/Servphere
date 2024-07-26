"use server";

import { auth } from "@/auth";
import { User } from "../../models/userModel";
import { Store } from "../../models/storeModel";
import { connectDB } from "../utils/connect";

export async function AddSocials(formData) {
  const session = await auth();
  const email = session.user?.email;
  const insta = formData.get("insta");
  const tiktok = formData.get("tiktok");
  const twitter = formData.get("twitter");

  // console.log(email);
  // console.log(insta);
  // console.log(tiktok);
  // console.log(twitter);

  const bio = formData.get("bio");

  // CONNECT DB
  await connectDB();

  await Store.updateOne(
    { ownerEmail: email },
    {
      $set: {
        ownerEmail: email,
        socialLinks: {
          insta: insta,
          tiktok: tiktok,
          twitter: twitter,
        },
        bio: bio,
      },
    }
  );
}
