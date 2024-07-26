"use client";
import React, { useState } from "react";
import { Button } from "../thumbnailPreviewCards/Button";
import Callout from "../thumbnailPreviewCards/Callout";
import Preview from "../thumbnailPreviewCards/Preview";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurSelectedPageIndex,
  updateFormData,
} from "@/redux/slices/thumbnailSlice";
import { UploadDropzone } from "@/utils/uploadthing";

const Thumbnail = () => {
  const curSelectedPageIndex = useSelector(
    (store) => store.thumbnail.curSelectedPageIndex
  );
  const formData = useSelector((store) => store.thumbnail.formData);

  const [data, setData] = useState({
    tb_image:
      "https://w7.pngwing.com/pngs/44/943/png-transparent-google-calendar-logo-icon.png",
    tb_title: "",
    tb_subtitle: "",
    tb_button: "",
    tb_price: "",
  });

  const styleOptions = ["Button", "Callout", "Preview"];
  const [myStyle, setMyStyle] = useState("Button");
  const [img, setImg] = useState("");

  const dispatch = useDispatch();

  const styleToComponentMapping = {
    Button: (
      <Button
        img={data.tb_image || formData.tb_image}
        buttonCTA={data.tb_button || formData.tb_button}
        price={data.tb_price || formData.tb_price}
      />
    ),
    Callout: (
      <Callout
        img={data.tb_image || formData.tb_image}
        title={data.tb_title || formData.tb_title}
        subtitle={data.tb_subtitle || formData.tb_subtitle}
        price={data.tb_price || formData.tb_price}
        buttonCTA={data.tb_button || formData.tb_button}
      />
    ),
    Preview: (
      <Preview
        img={data.tb_image || formData.tb_image}
        title={data.tb_title || formData.tb_title}
        subtitle={data.tb_subtitle || formData.tb_subtitle}
        price={data.tb_price || formData.tb_price}
        buttonCTA={data.tb_button || formData.tb_button}
      />
    ),
  };

  async function action(formData) {
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    dispatch(updateFormData(object));
    dispatch(setCurSelectedPageIndex(curSelectedPageIndex + 1));
  }

  return (
    <div className="flex h-full w-full">
      <div className="w-2/4 h-full">
        <form action={action} className="ml-6 space-y-5">
          <div className="w-full h-full space-y-10">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200/75">
                  <p className="text-xs text-gray-400">1</p>
                </div>
                <h3 className="text-gray-500 font-medium">Pick a style</h3>
              </div>

              <div className="flex flex-row space-x-4 w-full">
                {styleOptions.map((e) => (
                  <>
                    {myStyle === e ? (
                      <div
                        onClick={() => setMyStyle(e)}
                        key={e}
                        className="flex items-center justify-center p-3 h-[5rem] w-[5rem] border border-gray-200/50 bg-gray-200/50 rounded-lg"
                      >
                        <h3 className="text-xs text-gray-500 text-center">
                          {e}
                        </h3>
                      </div>
                    ) : (
                      <div
                        onClick={() => setMyStyle(e)}
                        key={e}
                        className="flex items-center justify-center p-3 border h-[5rem] w-[5rem] border-gray-200/50 hover:bg-gray-200/25 rounded-lg"
                      >
                        <h3 className="text-xs text-gray-500 text-center">
                          {e}
                        </h3>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex flex-row space-x-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200/75">
                  <p className="text-xs text-gray-400">2</p>
                </div>
                <h3 className="text-gray-500 font-medium">Select image</h3>
              </div>
              <UploadDropzone
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  // console.log("Files: ", res[0].url);
                  setData({ ...data, tb_image: res[0].url });
                  alert("Upload Completed");
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <input name="tb_image" value={data.tb_image} type="hidden" />
            </div>

            <div className="space-y-6">
              <div className="">
                <label className="text-gray-500 text-xs">Title</label>
                <input
                  defaultValue={formData.tb_title}
                  autoFocus
                  onChange={(e) =>
                    setData({ ...data, tb_title: e.target.value })
                  }
                  required
                  name="tb_title"
                  placeholder="title"
                  className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                />
              </div>

              <div className="">
                <label className="text-gray-500 text-xs">Subtitle</label>
                <input
                  defaultValue={formData.tb_subtitle}
                  onChange={(e) =>
                    setData({ ...data, tb_subtitle: e.target.value })
                  }
                  required
                  name="tb_subtitle"
                  placeholder="subtitle"
                  className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                />
              </div>

              <div className="">
                <label className="text-gray-500 text-xs">Button</label>
                <input
                  defaultValue={formData.tb_button}
                  onChange={(e) =>
                    setData({ ...data, tb_button: e.target.value })
                  }
                  required
                  name="tb_button"
                  placeholder="button"
                  className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                />
              </div>

              <div className="">
                <label className="text-gray-500 text-xs">Price</label>
                <input
                  defaultValue={formData.tb_price}
                  onChange={(e) =>
                    setData({ ...data, tb_price: e.target.value })
                  }
                  required
                  name="tb_price"
                  placeholder="price"
                  className="text-gray-500 text-sm focus:outline-none w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75"
                />
              </div>

              <input type="hidden" name="tb_style" value={myStyle} />

              <div className="flex flex-row w-full space-x-3 justify-end">
                <button className="bg-white border border-teal-300 hover:border-teal-200 hover:bg-gray-50/25 py-2 w-1/4 rounded focus:outline-none focus:shadow-outline">
                  <h4 className="text-sm text-teal-300 hover:text-teal-400">
                    Save as Draft{" "}
                  </h4>
                </button>

                <button
                  type="submit"
                  className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-1/4 rounded focus:outline-none focus:shadow-outline"
                >
                  <h4 className="text-sm text-white">Next</h4>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {styleToComponentMapping[myStyle]}
    </div>
  );
};

export default Thumbnail;
