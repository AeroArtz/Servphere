"use client";
import Link from "next/link";
import React, { useState } from "react";

const Servphere = () => {
  const [intro, setIntro] = useState({
    uname: null,
    img: null,
  });

  const [uname, setUname] = useState("");
  const [img, setImg] = useState("");

  const DrawerItems = [
    { name: "Home", route: "/home" },
    { name: "My Store", route: "/mystore" },
    { name: "Add Product", route: "/addproduct" },
    { name: "Pricing", route: "/pricing" },
    { name: "Settings", route: "/settings" },
  ];

  const [body, setBody] = useState({
    ename: null,
    edesc: null,
    sname: null,
    sdesc: null,
    sdates: null,
  });

  function Func(formData) {
    const uname = formData.get("uname");
    const img = formData.get("img");

    setIntro({
      uname: uname,
      img: img,
    });
  }

  function Func1(formData) {
    const ename = formData.get("ename");
    const edesc = formData.get("edesc");
    const sname = formData.get("sname");
    const sdesc = formData.get("sdesc");
    const sdates = formData.get("sdates");

    setBody({
      ename: ename,
      edesc: edesc,
      sname: sname,
      sdesc: sdesc,
      sdates: sdates,
    });

    // console.log(body)
  }

  return (
    <div className="flex flex-row">
      <div className="bg-blue-100 shadow-md rounded w-1/4">
        <div className="p-4 mt-4  text-gray-500 items-center justify-items-center">
          <h3 className="block text-md font-semibold">Servphere</h3>
        </div>
        {DrawerItems.map((elm, index) => (
          <div
            key={index}
            className="p-2 hover:bg-blue-300 hover:text-white text-gray-500 rounded-r-lg items-center justify-items-center"
          >
            <Link href={elm.route}>
              <h4 className="block text-xs font-regular">{elm.name}</h4>
            </Link>
          </div>
        ))}
      </div>

      <div className="w-6/12">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={Func}
        >
          <div className="mb-4">
            <label
              htmlFor="uname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter username
            </label>
            <input
              name="uname"
              type="text"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="img"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Upload image
            </label>
            <input
              name="img"
              placeholder="Image link"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            confirm
          </button>
        </form>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={Func1}
        >
          <div className="mb-4">
            <label
              htmlFor="ename"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Ebook name
            </label>
            <input
              name="ename"
              type="text"
              placeholder="Ebook name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="edesc"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Ebook Details
            </label>
            <input
              name="edesc"
              type="text"
              placeholder="Ebook details"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Book Service
            </label>
            <input
              name="sname"
              type="text"
              placeholder="service name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sdesc"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Service Details
            </label>
            <input
              name="sdesc"
              type="text"
              placeholder="Service details"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sdates"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Available Dates for Booking
            </label>
            <input
              name="sdates"
              type="text"
              placeholder="available dates"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            confirm
          </button>
        </form>
      </div>

      <div className="flex w-6/12 items-start justify-center">
        <div className="flex-col border-4 border-grey-500 rounded-xl flex w-3/5 h-3/4 mt-12">
          <div className="text-gray-700 text-sm p-5 items-center justify-center">
            <p className="mt-2">{intro.uname}</p>
            <p className="mt-2">{intro.img}</p>
          </div>

          <div className="text-gray-700 text-sm p-5 items-center justify-center">
            <p className="mt-2">{body.ename}</p>
            <p className="mt-2">{body.edesc}</p>
            <p className="mt-2">{body.sname}</p>
            <p className="mt-2">{body.sdesc}</p>
            <p className="mt-2">{body.sdates}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servphere;
