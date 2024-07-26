"use client";
import { auth } from "@/auth";
import { DefaultTemp } from "@/components/DefaultTemp";
import Navbar from "@/components/Navbar";
import { UploadDropzone } from "@/utils/uploadthing";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AddProfilePhoto } from "@/actions/AddProfilePhoto";
import Image from "next/image";
import { editUname } from "@/actions/editUname";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  // FOR FORM SUBMISSION
  const [img, setImg] = useState("");

  // RETREIVED FROM DATABASE
  const [storeData, setStoreData] = useState({});
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

  return (
    <div className="flex w-full h-full bg-white">
      <Navbar />

      <div className="w-full h-full">
        <h2 className="ml-6 mt-10 mb-2 block text-sky-900/65 text-3xl font-semibold">
          My Store
        </h2>

        <hr className="w-full" />

        <div className="flex flex-row">
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
            <div className="pl-8 space-y-2">
              <label
                htmlFor="img"
                className="block text-sky-900/65 text-lg font-semibold"
              >
                Edit Profile Photo
              </label>

              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button>
                      {JSON.stringify(storeData) === "{}" ? null : (
                        <div
                          style={{
                            backgroundImage: `url(${storeData[0].img})`,
                          }}
                          className="flex bg-cover min-w-28 min-h-28 hover:opacity-60 ml-5 rounded-full"
                        >
                          <MdEdit />
                        </div>
                      )}
                    </button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile Picture</DialogTitle>
                      <DialogDescription>
                        {`Make changes to your profile Picture here. Click save
                        when you're done.`}
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      action={async (formData) => {
                        const toastID = toast.loading("Updating Profile photo");

                        try {
                          await AddProfilePhoto(formData);
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
                    >
                      <div className="">
                        <UploadDropzone
                          endpoint={"imageUploader"}
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            // console.log("Files: ", res[0].url);
                            setImg(res[0].url);
                            alert("Upload Completed");
                          }}
                          onUploadError={(error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                        <input type="hidden" name="profileImg" value={img} />

                        <DialogFooter>
                          <button
                            type="submit"
                            className="mt-3 bg-teal-500/75 text-sm text-white hover:bg-teal-300/75 py-2 px-12 rounded focus:outline-none focus:shadow-outline"
                          >
                            Save changes
                          </button>
                        </DialogFooter>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <form
              action={async (formData) => {
                const toastID = toast.loading("Changing Username");

                try {
                  await editUname(formData);
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
              className="pt-6 pl-8 space-y-3"
            >
              <label
                htmlFor="name"
                className="block text-sky-900/65 text-lg font-semibold"
              >
                Edit User Name
              </label>

              <input
                required
                autoFocus
                placeholder="Enter new user name"
                type="text"
                name="username"
                className="focus:outline-none text-sm text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
              />

              <button
                type="submit"
                className="bg-teal-500/75 mt-6 hover:bg-teal-300/75 py-2 w-full rounded-md focus:outline-none focus:shadow-outline"
              >
                <h4 className="block text-white text-sm font-bold">
                  Save Changes
                </h4>
              </button>
            </form>
          </div>

          <div className="flex w-2/4 h-screen items-start justify-center">
            {JSON.stringify(storeData) === "{}" ? null : (
              <DefaultTemp sdata={storeData} themeColor={themeColor} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
