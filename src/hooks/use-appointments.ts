"use client";
import {
  bookAppointment,
  getAppointments,
  getBookedTimeSlots,
  getUserAppointments,
  updateAppointmentStatus,
} from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useGetAppointments() {
  const result = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
  return result;
}
export function useBookedTimeSlots(dentistId: string, date: string) {
  const result = useQuery({
    queryKey: ["getBookedTimeSlots"],
    queryFn: () => getBookedTimeSlots(dentistId, date),
    enabled: !!dentistId && !!date,
  });
  return result;
}

export function useBookAppointment() {
  const queryClient = useQueryClient();
  const results = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      // Invalidate Related Queries to Refresh the data
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
    },
    onError: (error) => console.log("Error while Book Appointment", error),
  });
  return results;
}
// Get user-specific appointments
export function useUserAppointments() {
  const result = useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });

  return result;
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  const results = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      // Invalidate Related Queries to Refresh the data
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => console.log("Error while update Appointment", error),
  });
  return results;
}
