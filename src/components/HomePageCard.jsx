import React from "react";
import { UploadDropzone } from "@uploadthing/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const HomePageCard = ({ index, title, desc, btnCTA, DialogTitle }) => {
  return (
    <div className="flex flex-row h-full mt-3 ml-6 space-x-3">
      {/* Step number */}
      <div className="flex flex-col">
        <div className="min-h-9 min-w-9 rounded-full border-2 border-blue-100 items-center justify-center flex">
          <p className="text-gray-400/50 text-xs font-regular">{index}</p>
        </div>

        <div className="border-l-2 h-full ml-4"></div>
      </div>

      {/* Card Content */}

      <div className="flex flex-col w-5/6 space-y-5 p-5 h-full border-0 mb-2 rounded-xl shadow-md">
        <h3 className="block text-sky-900/65 text-xl font-semibold">{title}</h3>

        <h4 className="block text-gray-500/75 text-xs font-semibold">{desc}</h4>

        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-2/5 rounded focus:outline-none focus:shadow-outline">
              <h4 className="block text-sm font-bold text-white">{btnCTA}</h4>
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Profile Picture</DialogTitle>
              <DialogDescription>
                {`Make changes to your profile Picture here. Click save when
                you're done.`}
              </DialogDescription>
            </DialogHeader>
            <div className="">
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
            </div>
            <DialogFooter>
              <button className="bg-teal-500/75 text-sm text-white hover:bg-teal-300/75 py-2 px-12 rounded focus:outline-none focus:shadow-outline">
                Save changes
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
