"use client";

import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments() {
  const result = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
  return result;
}
