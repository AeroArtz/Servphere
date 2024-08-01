"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center ">
      <form className=" w-full m-4 box-border	">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-3"
        />
        <Button
          onClick={handleSubmit}
          className="w-full bg-teal-500/75 hover:bg-teal-300/75"
        >
          Login
        </Button>
      </form>
      <Separator />
    </div>
  );
};

export default Page;
