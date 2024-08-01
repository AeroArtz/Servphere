"use client";
import { createServiceAction } from "@/actions/createServiceAction";
import Navbar from "@/components/Navbar";
import Availability from "@/components/coaching/pages/Availability";
import Checkout from "@/components/coaching/pages/Checkout";
import Thumbnail from "@/components/coaching/pages/Thumbnail";
import Link from "next/link";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setCurSelectedPageIndex,
  updateFormData,
} from "@/redux/slices/thumbnailSlice";

const Page = () => {
  const dispatch = useDispatch();
  const pageOptions = ["Thumbnail", "Checkout", "Availability", "Options"];
  const curSelectedPageIndex = useSelector(
    (store) => store.thumbnail.curSelectedPageIndex
  );

  return (
    <div className="flex bg-white w-full h-full">
      <Navbar />

      <div className="w-full h-full bg-white mt-5 mb-20">
        <h2 className="ml-6 mb-2 mt-5 block text-sky-900/65 text-2xl font-semibold">
          <span className="text-gray-300">My store /</span> Add Product
        </h2>

        <hr className="w-full" />

        <div className="flex flex-col">
          <div className="flex p-8 space-x-4">
            {pageOptions.map((option, index) => (
              <>
                {curSelectedPageIndex === index ? (
                  <div
                    onClick={() => dispatch(setCurSelectedPageIndex(index))}
                    key={option}
                    className="border-2 hover:border-teal-300/50 hover:text-teal-400 border-teal-300/50 text-teal-400 rounded-2xl px-4 py-1"
                  >
                    <Link href="">
                      <h4 className="block text-sm font-semibold">{option}</h4>
                    </Link>
                  </div>
                ) : (
                  <div
                    onClick={() => dispatch(setCurSelectedPageIndex(index))}
                    key={option}
                    className="border-2 hover:border-teal-300/50 hover:text-teal-400 text-sky-800/65 rounded-2xl px-4 py-1"
                  >
                    <Link href="">
                      <h4 className="block text-sm font-semibold">{option}</h4>
                    </Link>
                  </div>
                )}
              </>
            ))}
          </div>

          {curSelectedPageIndex == 0 && <Thumbnail />}

          {curSelectedPageIndex == 1 && <Checkout />}

          {curSelectedPageIndex == 2 && <Availability />}
        </div>
      </div>
    </div>
  );
};

export default Page;
