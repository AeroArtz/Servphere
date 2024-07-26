"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa6";
import { toast } from "sonner";
import { AddSocials } from "@/actions/AddSocials";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveIndex,
  updateCardStatusToDone,
} from "@/redux/slices/HomeStepperSlice";

export default function SocialsDialogMenu() {
  const activeIndex = useSelector((store) => store.HomeStepper.activeIndex);
  const dispatch = useDispatch();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-2/5 rounded focus:outline-none focus:shadow-outline">
          <h4 className="block text-sm font-bold text-white">
            + Add Social Links
          </h4>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter your Social links</DialogTitle>
          <DialogDescription>
            {`Make changes to your Social links here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>

        <form
          action={async (formData) => {
            const toastID = toast.loading("Adding Socials");

            try {
              await AddSocials(formData);
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
          <div className="space-y-4">
            <div>
              <label className="text-gray-500 text-xs">Bio</label>
              <input
                required
                name="bio"
                placeholder="A short description of yourself"
                type="text"
                className="focus:outline-none text-xs text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
              />
            </div>

            <div className="space-y-2">
              <div className="">
                <div className="flex flex-row space-x-2">
                  <FaTiktok size={23} />
                  <input
                    required
                    name="tiktok"
                    placeholder="Your Username"
                    type="text"
                    className="focus:outline-none text-xs text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                  />
                </div>
              </div>

              <div className="">
                <div className="flex flex-row space-x-2">
                  <IoLogoInstagram size={23} />
                  <input
                    required
                    name="insta"
                    placeholder="Your Username"
                    type="text"
                    className="focus:outline-none text-xs text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                  />
                </div>
              </div>

              <div className="">
                <div className="flex flex-row space-x-2">
                  <FaXTwitter size={23} />
                  <input
                    required
                    name="twitter"
                    placeholder="Your Username"
                    type="text"
                    className="focus:outline-none text-xs text-gray-500 w-full py-1.5 pl-2 rounded-sm font-regular bg-sky-50/75 border-0"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <button
                type="submit"
                className="bg-teal-500/75 text-sm text-white hover:bg-teal-300/75 py-2 px-12 rounded focus:outline-none focus:shadow-outline"
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
