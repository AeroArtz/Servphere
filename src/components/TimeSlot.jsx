import React, { useState } from "react";
import { Button } from "./ui/button";
const TimeSlot = ({ handleClick, timing, id }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Button
      variant="secondary"
      className={
        selected ? "h-10 w-28 text-[9px] blue" : "h-10 w-28 text-[9px]"
      }
      onClick={(event) => {
        event.preventDefault();
        handleClick(id);
        setSelected((prevState) => !prevState);
      }}
    >
      {timing}
    </Button>
  );
};

export default TimeSlot;
