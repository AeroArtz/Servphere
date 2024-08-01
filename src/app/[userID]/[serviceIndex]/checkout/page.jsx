"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();

  // INDEX OF SERVICE STORED IN SERVICES ARRAY
  const serviceIndex = params.serviceIndex;

  // console.log(params);

  const [checkoutData, setCheckoutData] = useState({});
  const [themeColor, setThemeColor] = useState("#000000");

  const getStoreDetails = async () => {
    const res = await fetch("/api/storedetails");
    const storeDetails = await res.json();
    return storeDetails;
  };

  // SET STATE VARIALBLE CHECKOUT DATA ON MOUNT AND THEME COLOR
  useEffect(() => {
    getStoreDetails().then((data) => {
      setCheckoutData(data[0].services[serviceIndex].checkout);
      setThemeColor(data[0].themeColor);
    });
  }, []);

  return (
    <div>
      {/* CHECK WHETHER API FETCHED OR NOT */}
      {JSON.stringify(checkoutData) === "{}" ? null : (
        <div className="flex flex-col items-center w-full h-full mt-3">
          <div className="bg-gray-600 min-h-28 min-w-48 rounded-lg">
            <Image
              src={checkoutData.img}
              width={100}
              height={100}
              className="rounded-lg min-h-28 min-w-48"
              alt="bg"
            />
          </div>

          <div className="flex flex-col h-full w-full p-3">
            <h2 className="text-lg text-gray-600 font-semibold">
              {checkoutData.title}
            </h2>

            <span className="text-sky-400 font-semibold">
              ${checkoutData.price}
            </span>

            <h4 className="text-sm mt-3 text-gray-500">{checkoutData.body}</h4>

            <button
              style={{ backgroundColor: themeColor }}
              type="submit"
              className="mt-6 w-full py-2 rounded-md focus:outline-none focus:shadow-outline"
            >
              <h4 className="block text-white text-sm font-bold">
                {checkoutData.buttonCTA}
              </h4>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
