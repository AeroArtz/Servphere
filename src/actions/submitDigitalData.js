"use server";

import { auth } from "@/auth";
import { User } from "../../models/userModel";
import { connectDB } from "../utils/connect";
import { Store } from "../../models/storeModel";

export async function submitDigitalData(formData) {
  // GET AUTHENTICATED USERS EMAIL

  const session = await auth();
  const email = session.user?.email;

  // THUMNAIL PAGE DATA

  const tb_img = formData.get("tb_img");
  const tb_title = formData.get("tb_title");
  const tb_subtitle = formData.get("tb_subtitle");
  const tb_buttonCTA = formData.get("tb_buttonCTA");
  const tb_price = formData.get("tb_price");

  // CHECKOUT PAGE DATA
  const ch_image = formData.get("ch_image");
  const ch_desc_title = formData.get("ch_desc_title");
  const ch_body = formData.get("ch_body");
  const ch_button = formData.get("ch_button");
  const ch_price = formData.get("ch_price");
  const ch_discount = formData.get("ch_discount");
  const ch_email = formData.get("ch_email");
  const ch_name = formData.get("ch_name");
  const ch_product = formData.get("ch_product");

  // console.log(ch_product);
  // console.log(email)

  // CONNECT DB
  await connectDB();

  await Store.updateOne(
    { ownerEmail: email },
    {
      $push: {
        services: {
          label: "digital",
          thumbnail: {
            img: tb_img,
            title: tb_title,
            subtitle: tb_subtitle,
            buttonCTA: tb_buttonCTA,
            price: tb_price,
          },

          checkout: {
            img: ch_image,
            title: ch_desc_title,
            body: ch_body,
            buttonCTA: ch_button,
            price: ch_price,

            discount: ch_discount,
            productURL: ch_product,
            collectInfo: {
              name: ch_name,
              email: ch_email,
            },
          },
        },
      },
    }
  );
}
