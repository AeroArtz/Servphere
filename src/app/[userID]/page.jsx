"use client";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState();

  const [sdata, setStoreData] = useState({});
  const [themeColor, setThemeColor] = useState("#000000");

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

  const servicesData = sdata[0]?.services;

  return (
    <div className="flex h-full w-full">
      {/* THUMBNAIL PAGE RENDERED DYNAMICALLY*/}

      {JSON.stringify(sdata) === "{}" ? null : (
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
          <div className="flex flex-col h-full w-full space-y-1 p-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
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
                        router.push(pathname + `/${activeIndex}/checkout`);
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
      )}
    </div>
  );
}
