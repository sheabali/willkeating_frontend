/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDeathDetailsQuery } from "@/redux/api/dashboardApi";
import { useParams } from "next/navigation";
import DeathNotice from "./DeathNotice";

export const metadata = {
  title: "Eleanor Harrington | Memorial",
  description: "Celebrating the life of Eleanor Harrington",
};

export default function DeathDetails() {
  const { id } = useParams() as any;

  console.log("id", id);

  const { data: deathData, isLoading } = useGetDeathDetailsQuery(id);

  const deathDetails = deathData?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DeathNotice data={deathDetails} />;
}
