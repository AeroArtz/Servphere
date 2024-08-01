import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models/userModel";
import { connectDB } from "../../utils/connect";
import { auth } from "@/auth";

const initialState = {
  curSelectedPageIndex: 0,
  formData: {},
};
const thumbnalSlice = createSlice({
  name: "thumbnail",
  initialState,
  reducers: {
    setCurSelectedPageIndex: (state, action) => {
      state.curSelectedPageIndex = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    uploadFormDataToDB: async (state, action) => {
      // GET GLOBAL STATE DATA AS OBJECT

      const formData = JSON.parse(JSON.stringify(state.formData));
      // console.log(formData);

      // USER SESSION

      const session = await auth();
      const email = session.user?.email;

      // THUMBNAIL PAGE ATTRIBUTES

      const tb_img = formData.tb_image;
      const tb_style = formData.tb_style;
      const tb_title = formData.tb_title;
      const tb_subtitle = formData.tb_subtitle;
      const tb_buttonCTA = formData.tb_button;
      const tb_price = formData.tb_price;

      // CHECKOUT PAGE ATTRIBUTES

      const ch_image = formData.ch_image;
      const ch_desc_title = formData.ch_desc_title;
      const ch_body = formData.ch_body;
      const ch_button = formData.ch_button;
      const ch_price = formData.ch_price;
      const ch_discount = formData.ch_discount;
      const ch_email = formData.ch_email;
      const ch_name = formData.ch - name;

      // CONNECT DB
      await connectDB();

      await User.updateOne(
        { email: email },
        {
          store: {
            ownerEmail: email,
            services: {
              coaching: {
                thumbnail: {
                  style: tb_style,
                  img: tb_img,
                  title: tb_title,
                  subtitle: tb_subtitle,
                  buttonCTA: tb_buttonCTA,
                },

                checkout: {
                  img: ch_image,
                  title: ch_desc_title,
                  body: ch_body,
                  buttonCTA: ch_button,
                  price: ch_price,
                  discount: ch_discount,
                  collectInfo: {
                    name: ch_name,
                    email: ch_email,
                  },
                },
              },
            },
          },
        }
      );
    },
  },
});

//uploadFormDataToDB

export const { setCurSelectedPageIndex, updateFormData, uploadFormDataToDB } =
  thumbnalSlice.actions;

export default thumbnalSlice.reducer;
