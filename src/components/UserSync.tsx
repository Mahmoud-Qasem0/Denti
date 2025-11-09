"use client";
import { syncUser } from "@/lib/actions/users";
import { useUser } from "@clerk/nextjs";
import { FC, useEffect } from "react";

const UserSync: FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    const handleUserSync = async () => {
      if (isLoaded && isSignedIn) {
        try {
          await syncUser();
          console.log(user);
        } catch (error) {
          console.log("error in syncUser server action", error);
        }
      }
    };
    handleUserSync();
  }, [isLoaded, isSignedIn, user]);
  return null;
};

export default UserSync;
