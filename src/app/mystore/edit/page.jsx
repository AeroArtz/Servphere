"use client";
import { DefaultTemp6 } from "@/components/DefaultTemp6";
import Navbar from "@/components/Navbar";
import Temp3 from "@/components/Temp3";
import { DefaultTemp } from "@/components/DefaultTemp";
import { DefaultTemp2 } from "@/components/defaultTemp2";
import { DefaultTemp3 } from "@/components/defaultTemp3";
import { DefaultTemp4 } from "@/components/defaultTemp4";
import { DefaultTemp5 } from "@/components/defaultTemp5";
import ColorPicker from "react-pick-color";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaInstagramSquare,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { toast } from "sonner";
import { editFirstLevel } from "@/actions/editFirstLevel";
import { useRouter } from "next/navigation";

//import bg2 from '@/assets/images/S-bg.png'

const Page = () => {
  let sdata = [
    {
      themeColor: "#7C4545",
      username: "Sandra jones",
      socialLinks: {
        twitter: "https://x.com/AbdulIkram12228",
        insta: "https://www.instagram.com/Aero.Artz/",
      },
      img: "https://utfs.io/f/cab4b932-d36f-40ad-bfd8-35f5e6f35227-1j1p0.png",
      bio: "Change the world",
      services: [
        {
          coaching: {
            thumbnail: {
              buttonCTA: "Book a Meeting",
              img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
              subtitle:
                "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
              title: "1-1 Coaching Session",
              price: "$50.99",
              priceBeforeDiscount: "$76.00",
            },
            checkout: {
              price: "$50.99",
              discount: "$76.00",
            },
          },
          digital: {
            thumbnail: {
              buttonCTA: "Download eBook",
              img: "https://t3.ftcdn.net/jpg/01/19/20/18/360_F_119201863_LVSuM2SBBLVID6Oj5Mpdb9U8D5yUDFOO.jpg",
              subtitle: "Get Access to exclusive information",
              title: "Buy my new eBook",
              price: "$20.99",
              priceBeforeDiscount: "$86.00",
            },
            checkout: {
              price: "$50.99",
              discount: "$76.00",
            },
          },
          onlineCourse: {
            thumbnail: {
              buttonCTA: "Buy Course",
              img: "https://img.favpng.com/23/7/4/computer-icons-educational-technology-learning-training-course-png-favpng-j5t2UTpdMx23LZhscuTVqAJGb.jpg",
              subtitle: "Go from zero to hero in just 6 weeks",
              title: "Online Course for Beginners",
              price: "$10.99",
              priceBeforeDiscount: "$36.00",
            },
            checkout: {
              price: "$50.99",
              discount: "$76.00",
            },
          },
        },
      ],
    },
  ];

  let xdata = [
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
    {
      buttonCTA: "Book a Meeting",
      img: "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
      subtitle:
        "Lets meet up in this 60-minute meeting. Ill teach you everything you need to about becoming an independent creator",
      title: "1-1 Coaching Session",
      price: "$50.99",
      discount: "$76.00",
    },
  ];

  const router = useRouter();

  const [templateOption, setTemplateOption] = useState(0);
  const [storeData, setStoreData] = useState({});
  const [themeColor, setThemeColor] = useState("#000000");

  storeData[0]?.themeColor;

  const getStoreDetails = async () => {
    const res = await fetch("/api/storedetails");
    const storeDetails = await res.json();
    return storeDetails;
  };

  useEffect(() => {
    getStoreDetails().then((data) => {
      setStoreData(data);
      setThemeColor(data[0].themeColor);
    });
  }, []);

  const options = {
    0: <DefaultTemp sdata={storeData} themeColor={themeColor} />,
    1: <DefaultTemp6 sdata={storeData} themeColor={themeColor} />,
  };

  const imgUrls = [
    "https://www.stan.store/img/store-stone.d21b6ce9.png",
    "https://www.stan.store/img/store-healing.1b63152e.png",
    "https://www.stan.store/img/store-abigail.c1aeeac1.png",
  ];

  // console.log(themeColor)

  const midGray = "#B9B9B9";

  return (
    <div className="flex bg-white w-full h-full">
      <Navbar />

      <div className="w-full h-full bg-white">
        <h2 className="ml-6 mt-3 mb-2 block text-sky-900/65 text-3xl font-semibold">
          <span className="text-gray-300">My store /</span> Edit Design
        </h2>

        <hr className="w-full" />

        <div className="flex">
          <div className="w-2/4 h-full">
            <div className="flex p-8 space-x-4">
              <div className="border-2 hover:border-sky-300/50 hover:text-sky-400 text-sky-800/65 rounded-2xl px-4 py-1">
                <Link href="">
                  <h4 className="block text-sm font-semibold">Sections</h4>
                </Link>
              </div>

              <div className="border-2 hover:border-sky-300/50 hover:text-sky-400 text-sky-800/65 rounded-2xl px-4 py-1">
                <Link href="/mystore/edit">
                  <h4 className="block  text-sm font-semibold">Edit Design</h4>
                </Link>
              </div>
            </div>

            <form
              action={async (formData) => {
                const toastID = toast.loading("Updating Theme Color");

                try {
                  await editFirstLevel(formData);
                  toast.success("Changes Successful", {
                    id: toastID,
                  });

                  router.refresh();
                } catch (error) {
                  toast.error(String(error), {
                    id: toastID,
                  });
                }
              }}
              className="ml-6 space-y-2"
            >
              <label className="block text-sky-900/65 text-md font-semibold">
                Choose Colors
              </label>

              <div className="flex flex-row space-x-2 pt-2">
                <ColorPicker
                  color={themeColor}
                  onChange={(color) => setThemeColor(color.hex)}
                />
              </div>

              <div className="">
                <h2 className="block mt-9 text-sky-900/65 text-md font-semibold">
                  Choose template
                </h2>

                <div className="flex space-x-6">
                  <div onClick={() => setTemplateOption(0)}>1</div>
                  <div onClick={() => setTemplateOption(1)}>2</div>
                </div>
              </div>

              <input type="hidden" name="fieldValue" value={themeColor} />
              <input type="hidden" name="fieldName" value={"themeColor"} />

              <button
                type="submit"
                className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-2/5 rounded focus:outline-none focus:shadow-outline"
              >
                <h4 className="block text-sm font-bold text-white">
                  Save Changes
                </h4>
              </button>
            </form>
          </div>

          <div className="flex w-2/4 h-screen items-start justify-center">
            {JSON.stringify(storeData) === "{}"
              ? null
              : options[templateOption]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
