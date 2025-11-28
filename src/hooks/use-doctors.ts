"use client";

import {
  createDoctor,
  getAvailableDoctors,
  getDoctors,
  updateDoctor,
} from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
  const results = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  return results;
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  const results = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      // Invalidate Related Queries to Refresh the data
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error) => console.log("Error while Creating a doctor", error),
  });
  return results;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();
  const results = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      // Invalidate Related Queries to Refresh the data
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error) => console.log("Error while Updating a doctor", error),
  });
  return results;
}

// get available doctors for appointments
export function useAvailabeDoctors() {
  const results = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
  return results;
}
