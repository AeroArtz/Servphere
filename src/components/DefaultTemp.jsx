"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaInstagramSquare,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import CheckoutDetailsPage from "./coaching/CheckoutDetailsPage";
import { IoArrowBackSharp } from "react-icons/io5";
import AvailabilityDetailsPage from "./coaching/AvailabilityDetailsPage";

export const DefaultTemp = ({ sdata, themeColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const servicesData = sdata[0].services;

  let serviceIndexToComponentMapping = {};
  // console.log(servicesData);

  for (let i = 0; i < servicesData.length; i++) {
    serviceIndexToComponentMapping[i] = (
      <CheckoutDetailsPage
        img={servicesData[i].checkout.img}
        desc_title={servicesData[i].checkout.title}
        price={servicesData[i].checkout.price}
        body={servicesData[i].checkout.body}
        buttonCTA={servicesData[i].checkout.buttonCTA}
        themeColor={sdata[0].themeColor}
      />
    );
  }

  // console.log(serviceIndexToComponentMapping);

  /*
    const getStoreDetails = async () => {
        const res = await fetch("/api/storedetails");
        const storeDetails = await res.json();
        return storeDetails;
    }

    useEffect(() => {
        getStoreDetails().then((data) => {
            setStoreData(data);
        })
    },[]);

    console.log(storeData);

    */

  return (
    <div className="flex flex-col sticky top-20 overflow-y-scroll items-center bg-[#f8f8f8] border-8 border-gray-800 rounded-[40px] w-[55%] h-[85%] mt-12">
      {/* TOP NOTCH UPPER MOBIILE LINE */}
      <div className="flex sticky top-0 bg-gray-800 w-36 min-h-5 rounded-b-xl items-center justify-center space-x-3">
        <hr className="border-2 rounded-md border-gray-700 w-12" />

        <div className="h-2 w-2 bg-blue-900 rounded-full"></div>
      </div>

      {/* CHECKOUT PAGE RENDERED DYNAMICALLY*/}

      <div id="checkout" className="h-full w-full hidden">
        <div className="h-full w-full pb-6 space-y-20">
          <div className="flex ml-3 mt-3 w-full space-x-14">
            <IoArrowBackSharp
              onClick={() => {
                let a = document.getElementById("checkout");
                let b = document.getElementById("thumbnail");

                a.style.display = "none";
                b.style.display = "flex";
              }}
              size={25}
              className=""
            />

            <h1 className="text-lg text-gray-600 text-center font-semibold">
              Checkout
            </h1>
          </div>

          {serviceIndexToComponentMapping[activeIndex]}

          {servicesData[activeIndex]?.label === "coaching" ? (
            <AvailabilityDetailsPage />
          ) : null}
        </div>
      </div>

      {/* THUMBNAIL PAGE RENDERED DYNAMICALLY*/}

      <div id="thumbnail" className="flex flex-col items-center">
        {/* PROFILE IMAGE */}
        <div
          style={{ backgroundImage: `url(${sdata[0].img})` }}
          className="flex bg-cover min-h-24 min-w-24 mt-8 rounded-full"
        ></div>

        {/* USERNAME */}
        <h1 className="text-gray-600 block font-bold text-xl mt-3">
          {sdata[0].username}
        </h1>

        {/* EXISTING SOCIALS */}
        <div className="flex mt-2 space-x-3"></div>

        {/* CARDS LIST CONTAINER */}
        <div className="flex flex-col h-full w-full space-y-1 p-3">
          {servicesData.map((elm, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="bg-white rounded-lg shadow-inner"
            >
              <div className="flex flex-col space-y-2 m-3">
                <div className="flex w-full h-full space-x-3">
                  <div className="min-h-8 min-w-8">
                    {
                      <Image
                        src={elm.thumbnail.img}
                        height={100}
                        width={100}
                        className="rounded-sm min-h-9 min-w-9 max-w-9 max-h-9"
                        alt="logo"
                      />
                    }
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-sm text-gray-500 font-medium">
                      {elm.thumbnail.title}
                    </h3>

                    {index === activeIndex ? (
                      <h4 className="text-xs text-gray-400">
                        {elm.thumbnail.subtitle}
                      </h4>
                    ) : (
                      <h4 className="text-xs line-clamp-2 text-gray-400">
                        {elm.thumbnail.subtitle}
                      </h4>
                    )}

                    {/* CONDITIONAL RENDER BASED ON DISCOUNT */}
                    {index === activeIndex ? (
                      elm.checkout.discount ? (
                        <div
                          style={{ color: themeColor }}
                          className="flex flex-row items-center space-x-1.5"
                        >
                          <span className="font-semibold">
                            {elm.checkout.discount}
                          </span>
                          <span className="text-decoration-line: line-through opacity-50 text-sm font-semibold">
                            {elm.checkout.price}
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{ color: themeColor }}
                          className="flex flex-row items-center space-x-1.5"
                        >
                          <span className="font-semibold">
                            {elm.checkout.price}
                          </span>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>

                {index === activeIndex ? (
                  <button
                    style={{ backgroundColor: themeColor }}
                    onClick={() => {
                      let a = document.getElementById("checkout");
                      let b = document.getElementById("thumbnail");

                      b.style.display = "none";
                      a.style.display = "flex";
                    }}
                    className="py-2 w-full rounded focus:outline-none focus:shadow-outline"
                  >
                    <h4 className="text-sm text-white">
                      {elm.thumbnail.buttonCTA}
                    </h4>
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
