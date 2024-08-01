"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { auth } from "@/auth";
import Link from "next/link";
import { useSelector } from "react-redux";

import SocialsDialogMenu from "@/components/Home/SocialsDialogMenu";
import ProfileDialogMenu from "@/components/Home/ProfileDialogMenu";

const home = () => {
  const activeIndex = useSelector((store) => store.HomeStepper.activeIndex);
  const cardStatus = useSelector((store) => store.HomeStepper.done);

  const CardsInfo = [
    {
      title: "Add Your Profile Picture",
      desc: "Personalize your store by adding your picture",
      CTA: <ProfileDialogMenu />,
      done: false,
    },
    {
      title: "Add Your Socials",
      desc: "Add links to your socials so you can connect to your audience from multiple platforms",
      CTA: <SocialsDialogMenu />,
      done: false,
    },
    {
      title: "Create Your First Product",
      desc: "Add a Digital Product, Service or a Booking session all in one place",
      CTA: (
        <Link href="/mystore/addproduct">
          <button className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-2/5 rounded focus:outline-none focus:shadow-outline">
            <h4 className="block text-sm font-bold text-white">
              + Add Product
            </h4>
          </button>
        </Link>
      ),
      done: false,
    },
  ];

  let tasksDone = 0;
  for (let i = 0; i < CardsInfo.length; i++) {
    if (CardsInfo[i].done) tasksDone++;
  }

  return (
    <div className="flex h-screen bg-white">
      <Navbar />

      <div className="w-full">
        <h2 className="ml-6 mt-10 mb-2 block text-sky-900/65 text-3xl font-semibold">
          Home
        </h2>
        <hr className="w-full" />

        <h4 className="ml-6 pt-4 block text-sky-900/65 text-lg font-semibold">
          Store Launch Checklist
        </h4>

        <p className="ml-6 pt-1 mb-4 text-slate-500/50 text-xs font-semibold">
          {`${tasksDone}/${CardsInfo.length}`} Tasks Completed
        </p>

        {/* Card list componentized */}
        <div className="flex flex-col">
          {CardsInfo.map((card, index) => (
            <div key={index} className="flex flex-row  h-full ml-6 space-x-3">
              {/* Step number */}
              <div className="flex flex-col">
                {cardStatus[index] ? (
                  <div className="flex h-10 w-10 items-center justify-center">
                    <IoIosCheckmarkCircle
                      className="h-full w-full"
                      color="teal"
                    />
                  </div>
                ) : index == activeIndex ? (
                  // CONDITIONALLY RENDER STEP BASED ON ACTIVE CARD INDEX
                  <div className="min-h-9 min-w-9 rounded-full border-2 border-teal-300 items-center justify-center flex">
                    <p className="text-gray-400/50 text-xs font-regular">
                      {index}
                    </p>
                  </div>
                ) : (
                  <div className="min-h-9 min-w-9 rounded-full border-2 border-blue-100 items-center justify-center flex">
                    <p className="text-gray-400/50 text-xs font-regular">
                      {index}
                    </p>
                  </div>
                )}

                {index === CardsInfo.length - 1 ? null : (
                  <div className="border-l-2 h-full ml-4"></div>
                )}
              </div>

              {/* Card Content */}

              {index !== activeIndex ? (
                <div className="flex flex-col w-5/6 space-y-5 p-5 h-full border-0 mb-2 rounded-xl shadow-md">
                  <h3 className="block text-sky-900/65 text-xl font-semibold">
                    {card.title}
                  </h3>

                  <h4 className="block text-gray-500/75 text-xs font-semibold">
                    {card.desc}
                  </h4>
                </div>
              ) : (
                <div className="flex flex-col w-5/6 space-y-5 p-5 h-full border-0 mb-2 rounded-xl shadow-md">
                  <h3 className="block text-sky-900/65 text-xl font-semibold">
                    {card.title}
                  </h3>

                  <h4 className="block text-gray-500/75 text-xs font-semibold">
                    {card.desc}
                  </h4>

                  {card.CTA}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default home;
