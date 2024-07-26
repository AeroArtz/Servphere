"use client";
import React, { useState } from "react";
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
import { UploadDropzone } from "@uploadthing/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveIndex,
  updateCardStatusToDone,
} from "@/redux/slices/HomeStepperSlice";

export default function ProfileDialogMenu() {
  const activeIndex = useSelector((store) => store.HomeStepper.activeIndex);
  const dispatch = useDispatch();

  const [profileImg, setProfileImg] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-2/5 rounded focus:outline-none focus:shadow-outline">
          <h4 className="block text-sm font-bold text-white">
            + Add Profile Picture
          </h4>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>
          <DialogDescription>
            {`Make changes to your profile Picture here. Click save when you're
            done.`}
          </DialogDescription>
        </DialogHeader>

        <form
          action={async (formData) => {
            const toastID = toast.loading("Adding Profile photo");

            try {
              //await AddProfilePhoto(formData);
              toast.success("Changes Successful", {
                id: toastID,
              });

              dispatch(updateCardStatusToDone(activeIndex));

              if (activeIndex < 2) dispatch(setActiveIndex(activeIndex + 1));
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
                setProfileImg(res[0].url);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />

            <input type="hidden" name="profileImg" value={profileImg} />

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
  );
}
