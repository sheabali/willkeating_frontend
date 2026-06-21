/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetObituaryDetailsQuery } from "@/redux/api/dashboardApi";
import { useParams } from "next/navigation";
import FuneralNotice from "./memorial-page";

export const metadata = {
  title: "Eleanor Harrington | Memorial",
  description: "Celebrating the life of Eleanor Harrington",
};

export default function ObituaryDetails() {
  const { id } = useParams() as any;

  console.log("id", id);

  const { data: obituaryData, isLoading } = useGetObituaryDetailsQuery(id);

  const obituaryDetails = obituaryData?.data;

  console.log("obituaryDetails", obituaryDetails);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <FuneralNotice data={obituaryDetails} />;
}
