"use client";
import React from "react";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";

const ImageUpload = ({ endpoint }) => {
  // console.log(endpoint)
  return (
    <UploadDropzone
      className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        // console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default ImageUpload;
