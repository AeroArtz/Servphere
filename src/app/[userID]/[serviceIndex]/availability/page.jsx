"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TimeSlot from "@/components/TimeSlot";
export default function Page() {
  // GET PARAMETERS FROM CURRENT URL
  const params = useParams();

  // INDEX OF SERVICE STORED IN SERVICES ARRAY
  const serviceIndex = params.serviceIndex;

  // console.log(params);

  // STATE VARIABLE TO STORE AVAILABILITY DATA
  const today = new Date();
  const [data, setData] = useState([]);
  const [themeColor, setThemeColor] = useState("#000000");
  const [date, setDate] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  // STATE VARIABLE TO STORE AVAILABILE TIME SLOTS

  // FUNCTION TO GET AVAILABLE TIME SLOTS
  function getTimeSlots(
    openingTime,
    closingTime,
    meetingDuration,
    breakBefore,
    breakAfter
  ) {
    const parseTime = (time) => {
      const [timePart, period] = time.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const formatTime = ({ hours, minutes }) => {
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )} ${period}`;
    };

    const addMinutes = (time, minutesToAdd) => {
      let { hours, minutes } = time;
      minutes += minutesToAdd;
      while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
      return { hours, minutes };
    };

    const opening = parseTime(openingTime);
    const closing = parseTime(closingTime);
    const slots = [];

    let currentTime = opening;

    while (true) {
      const startSlot = addMinutes(currentTime, breakBefore);
      const endSlot = addMinutes(startSlot, meetingDuration);
      const nextStartTime = addMinutes(endSlot, breakAfter);

      if (
        endSlot.hours > closing.hours ||
        (endSlot.hours === closing.hours && endSlot.minutes > closing.minutes)
      ) {
        break;
      }

      slots.push({ start: formatTime(startSlot), end: formatTime(endSlot) });
      currentTime = nextStartTime;
    }

    return slots;
  }

  const getStoreDetails = async () => {
    const res = await fetch("/api/storedetails");
    const storeDetails = await res.json();
    return storeDetails;
  };

  // SET STATE VARIALBLE CHECKOUT DATA ON MOUNT AND THEME COLOR
  useEffect(() => {
    getStoreDetails().then((data, index) => {
      // console.log("data", data);
      setData(data);

      setThemeColor(data[0].themeColor);
      // SET AVAILABILITY DATA VARIABLE
      // Previously the availability data was a regular variable which was being "mutated"  on the top level of the component which caused it to be "set" every re-render which could have impacted performance, so i created a state variable and set it on the first render
      setAvailabilityData(data[0]?.services[1]?.availability);
    });
  }, []);

  useEffect(() => {
    // CALCULATE TIME SLOTS FOR EACH DAY
    //Previously time slots was a regular variable that was being mutated on the top level of the component which caused it to be "mutated" and set on every re-render which could have affected performance and is a bad practice, so i created a state variable and set it as soon as availability data is set
    if (availabilityData?.length !== 0)
      setTimeSlots((prevTimeSlots) => {
        let timeSlotsTemp = {};
        availabilityData?.timings?.forEach(
          (elm, index) =>
            (timeSlotsTemp[elm.day] = getTimeSlots(
              `${elm.opening_hour}:${elm.opening_minute} ${elm.opening_AM_or_PM}`,
              `${elm.closing_hour}:${elm.closing_minute} ${elm.closing_AM_or_PM}`,
              availabilityData?.duration,
              availabilityData?.breakBefore,
              availabilityData?.breakAfter
            ))
        );
        return timeSlotsTemp;
      });
  }, [availabilityData]);
  console.log("selected time slots", selectedTimeSlots);
  /*
    // SET TIME SLOT ARRAY BASED ON SELECTED DATE - SUS CODE
    useEffect(() => {

        {   (JSON.stringify(availabilityData) === '{}') ?  setSelectDatesTimeSlots([]): 

        setSelectDatesTimeSlots(availabilityData[date.toLocaleString('en-us', {weekday:'long'})])

        }
    },[date]);
    */

  // const handleTimeSlotSelect = (id) => {
  //   setSelectedTimeSlots((prevState) => {
  //     let dateToggled = id.slice(0, id.indexOf(" "));
  //     let timingToggled = id.slice(id.indexOf(" ") + 1);
  //     let dateToggledIndex = prevState.findIndex(
  //       (timeSlot) => timeSlot.date === dateToggled
  //     );
  //     let dateExists = dateToggledIndex === -1 ? false : true;
  //     console.log("date exists", dateExists);
  //     let newState = prevState;
  //     if (!dateExists) {
  //       newState.push({ date: dateToggled, timings: [timingToggled] });
  //     } else {
  //       let timingToggledIndex = newState[dateToggledIndex]?.timings.findIndex(
  //         (timing) => timing === timingToggled
  //       );
  //       let timingExists = timingToggledIndex === -1 ? false : true;
  //       if (!timingExists) {
  //         newState[dateToggledIndex].timings.push(timingToggled);
  //       } else {
  //         let filteredTimings = newState[dateToggledIndex]?.timings;
  //         filteredTimings = filteredTimings?.filter(
  //           (timing) => timing !== timingToggled
  //         );
  //         newState[dateToggledIndex].timings = filteredTimings;
  //       }
  //     }
  //     return newState;
  //   });
  // };
  const handleTimeSlotSelect = (id) => {
    setSelectedTimeSlots((prevState) => {
      const dateToggled = id.slice(0, id.indexOf(" "));
      const timingToggled = id.slice(id.indexOf(" ") + 1);

      return prevState.some((slot) => slot.date === dateToggled)
        ? prevState.map((slot) =>
            slot.date === dateToggled
              ? {
                  ...slot,
                  timings: slot.timings.includes(timingToggled)
                    ? slot.timings.filter((timing) => timing !== timingToggled)
                    : [...slot.timings, timingToggled],
                }
              : slot
          )
        : [...prevState, { date: dateToggled, timings: [timingToggled] }];
    });
  };
  const handleBookClick = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    console.log(selectedTimeSlots);
  }, [selectedTimeSlots]);
  return (
    <div>
      {/* CHECK WHETHER API FETCHED OR NOT */}
      {JSON.stringify(availabilityData) === "{}" ? null : (
        <div>
          <form>
            <div className="flex flex-col h-full w-full justify-center items-center ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={{ before: today }}
              />

              <div className="flex flex-col space-y-3 mt-6 ">
                {/* previously we had not checked for the condition if date was undefined which happens when the user clicks on a date and clicks again which causes it to be undefined, and that was leading to an error */}
                {JSON.stringify(timeSlots) !== "{}" && date !== undefined ? (
                  <>
                    <h2 className="text-md font-semibold text-gray-600">
                      Select time Slots
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots[
                        date.toLocaleString("en-us", { weekday: "long" })
                      ].map((elm, index) => (
                        <div
                          key={index}
                          className="flex justify-content items-center space-x-2 h-10 w-25 text-gray-500"
                        >
                          {/* here i am using a button component that i created - TimeSlot, which when selected gets saved in the state and displays the changes on the UI */}
                          <TimeSlot
                            id={`${date.toLocaleDateString("en-ca")} ${
                              elm.start
                            }-${elm.end}`}
                            timing={`${elm.start}-${elm.end}`}
                            handleClick={handleTimeSlotSelect}
                            selected={selectedTimeSlots.some(
                              (slot) =>
                                slot.date ===
                                  date.toLocaleDateString("en-ca") &&
                                slot.timings.includes(`${elm.start}-${elm.end}`)
                            )}
                          />
                        </div>
                      ))}
                    </div>
                    {/* when the Book Appointment button is clicked we intend to create a reservation using the data stored in the selected time slots state variable */}
                    <button
                      type="submit"
                      className="bg-teal-500/75 hover:bg-teal-300/75 py-2 w-full rounded focus:outline-none focus:shadow-outline mt-6 mb-10"
                      onClick={handleBookClick}
                    >
                      <h4 className="text-sm text-white">Book Appointment</h4>
                    </button>
                  </>
                ) : // this is basically a fallback, so in case no date has been selected this would be rendered on the page
                JSON.stringify(timeSlots) !== "{}" && date === undefined ? (
                  <h2 className="flex text-md font-semibold text-gray-600 self-start">
                    Please select a date
                  </h2>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
