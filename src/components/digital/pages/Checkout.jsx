"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurSelectedPageIndex,
  updateFormData,
} from "@/redux/slices/digitalSlice";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";
import { toast } from "sonner";
import { submitDigitalData } from "@/actions/submitDigitalData";

const Checkout = () => {
  const curSelectedPageIndex = useSelector(
    (store) => store.digital.curSelectedPageIndex
  );
  const formData = useSelector((store) => store.digital.formData);

  // console.log(formData);

  const [data, setData] = useState({
    ch_image:
      "https://utfs.io/f/0cdb8cea-f301-4eae-a1e9-401dd97c2ff1-2bjn.jpg.webp",
    ch_desc_title: "",
    ch_body: "",
    ch_button: "",
    ch_price: "",
    ch_discount: "",
    ch_product: "",
    ch_name: "",
    ch_email: "",
  });

  //   console.log(data);

  // THUMBNAIL PAGE ATTRIBUTES

  const tb_img = formData.tb_image || undefined;
  const tb_title = formData.tb_title || undefined;
  const tb_subtitle = formData.tb_subtitle || undefined;
  const tb_buttonCTA = formData.tb_button || undefined;
  const tb_price = formData.tb_price || undefined;

  // CHECKOUT PAGE ATTRIBUTES

  const ch_image = data.ch_image || undefined;
  const ch_desc_title = data.ch_desc_title || undefined;
  const ch_body = data.ch_body || undefined;
  const ch_button = data.ch_button || undefined;
  const ch_price = data.ch_price || undefined;
  const ch_discount = data.ch_discount || undefined;
  const ch_email = data.ch_email || undefined;
  const ch_name = data.ch_name || undefined;
  const ch_product = data.ch_product || undefined;

  const dispatch = useDispatch();

  async function action(formData) {
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    dispatch(updateFormData(object));
    dispatch(setCurSelectedPageIndex(curSelectedPageIndex + 1));
  }

  //   console.log(curSelectedPageIndex);

  return (
    <div className="flex h-full w-full">
      <div className="w-2/4 h-full">
        <form
          action={async (formData) => {
            const toastID = toast.loading("Creating Account");

            try {
              // SUBMIT MULTI STEP FORM DATA
              await submitDigitalData(formData);

              toast.success("Service Successfully Created", {
                id: toastID,
              });
            } catch (error) {
              toast.error("Failed to Create Service", {
                id: toastID,
              });
            }
          }}
          className="ml-6 space-y-2"
        >
          <div className="w-full h-full space-y-10">
            <div className="flex flex-col space-y-20">
              <div className="space-y-6">
                <div className="flex flex-row space-x-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100/75">
                    <p className="text-xs text-gray-400">1</p>
                  </div>
                  <h3 className="text-gray-500 font-medium">Select an image</h3>
                </div>

                <UploadDropzone
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    // console.log("Files: ", res[0].url);
                    setData({ ...data, ch_image: res[0].url });
                    alert("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <input name="ch_image" value={data.ch_image} type="hidden" />
              </div>

              <div className="space-y-6">
                <div className="flex flex-row space-x-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100/75">
                    <p className="text-xs text-gray-400">2</p>
                  </div>
                  <h3 className="text-gray-500 font-medium">
                    Write Description
                  </h3>
                </div>

                <div className="w-full space-y-4">
                  <div>
                    <label className="text-gray-500 text-xs">
                      Description Title
                    </label>
                    <input
                      defaultValue={formData.ch_desc_title}
                      onChange={(e) =>
                        setData({ ...data, ch_desc_title: e.target.value })
                      }
                      required
                      autoFocus
                      name="ch_desc_title"
                      placeholder="Description title"
                      type="text"
                      className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                    />
                  </div>

                  <Textarea
                    defaultValue={formData.ch_body}
                    name="ch_body"
                    required
                    placeholder="Description Body"
                    onChange={(e) =>
                      setData({ ...data, ch_body: e.target.value })
                    }
                  />

                  <div>
                    <label className="text-gray-500 text-xs">
                      Call-to-Action Button
                    </label>
                    <input
                      defaultValue={formData.ch_button}
                      onChange={(e) =>
                        setData({ ...data, ch_button: e.target.value })
                      }
                      required
                      name="ch_button"
                      placeholder="Button Call-to-Action "
                      type="text"
                      className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-row space-x-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100/75">
                    <p className="text-xs text-gray-400">3</p>
                  </div>
                  <h3 className="text-gray-500 font-medium">Set Price</h3>
                </div>

                <div className="flex flex-row space-x-3">
                  <div>
                    <label className="text-gray-500 text-xs">Price</label>
                    <input
                      defaultValue={formData.ch_price}
                      onChange={(e) =>
                        setData({ ...data, ch_price: e.target.value })
                      }
                      required
                      name="ch_price"
                      placeholder="Price"
                      type="text"
                      className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                    />
                  </div>

                  <div>
                    <label className="text-gray-500 text-xs">
                      Discount Price
                    </label>
                    <input
                      defaultValue={formData.ch_discount}
                      onChange={(e) =>
                        setData({ ...data, ch_price: e.target.value })
                      }
                      name="ch_discount"
                      placeholder="Discount"
                      type="text"
                      className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-row space-x-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100/75">
                    <p className="text-xs text-gray-400">3</p>
                  </div>
                  <h3 className="text-gray-500 font-medium">Collect info</h3>
                </div>

                <div className="w-full space-y-3">
                  <label className="text-gray-500 text-xs">Fields</label>
                  <input
                    onChange={(e) =>
                      setData({ ...data, ch_name: e.target.value })
                    }
                    name="ch_name"
                    placeholder="Name"
                    type="text"
                    className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                  />
                  <input
                    onChange={(e) =>
                      setData({ ...data, ch_email: e.target.value })
                    }
                    name="ch_email"
                    placeholder="Email"
                    type="text"
                    className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-row space-x-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100/75">
                    <p className="text-xs text-gray-400">4</p>
                  </div>
                  <h3 className="text-gray-500 font-medium">
                    Upload Your Digital Product
                  </h3>
                </div>

                <div className="w-full space-y-3">
                  <label className="text-gray-500 text-xs">Fields</label>

                  <UploadDropzone
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      //   console.log("Files: ", res[0].url);
                      setData({ ...data, ch_product: res[0].url });
                      alert("Upload Completed");
                    }}
                    onUploadError={(error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  <input
                    name="ch_product"
                    value={data.ch_product}
                    type="hidden"
                  />
                </div>
              </div>

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

              {/* PASSING ALL DATA FROM MUTLI STEP FORM */}

              <input type="hidden" name="tb_img" value={tb_img} />
              <input type="hidden" name="tb_title" value={tb_title} />
              <input type="hidden" name="tb_subtitle" value={tb_subtitle} />
              <input type="hidden" name="tb_buttonCTA" value={tb_buttonCTA} />
              <input type="hidden" name="tb_price" value={tb_price} />

              <input type="hidden" name="ch_image" value={ch_image} />
              <input type="hidden" name="ch_desc_title" value={ch_desc_title} />
              <input type="hidden" name="ch_body" value={ch_body} />
              <input type="hidden" name="ch_button" value={ch_button} />
              <input type="hidden" name="ch_price" value={ch_price} />
              <input type="hidden" name="ch_discount" value={ch_discount} />
              <input type="hidden" name="ch_email" value={ch_email} />
              <input type="hidden" name="ch_name" value={ch_name} />
              <input type="hidden" name="ch_product" value={ch_product} />
            </div>
          </div>
        </form>
      </div>

      <div className="flex w-2/4 items-start justify-center">
        <div className="flex flex-col sticky top-20 overflow-y-scroll justify-center items-center bg-[#fefefe] border-8 border-gray-800 rounded-[40px] w-[18rem] h-[35rem] mt-6">
          {/* TOP NOTCH UPPER MOBIILE LINE */}
          <div className="flex sticky top-0 bg-gray-800 w-36 min-h-5 rounded-b-xl items-center justify-center space-x-3">
            <hr className="border-2 rounded-md border-gray-700 w-12" />

            <div className="h-2 w-2 bg-blue-900 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center w-full h-full mt-3">
            <div className="bg-gray-600 w-[90%] h-[27%] rounded-lg">
              {data.ch_image ? (
                <Image
                  src={data.ch_image}
                  width={100}
                  height={100}
                  className="w-full h-full rounded-lg"
                  alt="bg"
                />
              ) : null}
            </div>

            <div className="flex flex-col h-full w-full ml-7 mt-3">
              <h2 className="text-lg text-gray-600 font-semibold">
                {data.ch_desc_title || formData.ch_desc_title}
              </h2>

              <span className="text-sky-400 font-semibold">
                ${data.ch_price || formData.ch_price}
              </span>

              <h4 className="text-sm mt-3 text-gray-500">
                {data.ch_body || formData.ch_body}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
