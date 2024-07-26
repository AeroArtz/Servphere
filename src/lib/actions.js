"use server";

import { prisma } from "./prisma";

export const getData = async (query) => {
  try {
    // console.log("list all data");
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
