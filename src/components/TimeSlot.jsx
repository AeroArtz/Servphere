import React, { useState } from "react";
import { Button } from "./ui/button";
const TimeSlot = ({ handleClick, timing, id, selected }) => {
  // const index = id.indexOf(" ");
  // console.log(id.slice(0, index));
  console.log("timing", id.slice(id.indexOf(" ") + 1));
  return (
    <Button
      variant="outline"
      className={`h-10 w-28 text-[9px] ${
        selected
          ? "border-accent-foreground bg-accent text-accent-foreground"
          : ""
      }`}
      onClick={(event) => {
        event.preventDefault();
        handleClick(id);
      }}
    >
      {timing}
    </Button>
  );
};

export default TimeSlot;
