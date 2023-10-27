"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

import { useUserStore } from "@/datarepo/stores";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/datarepo/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "next/router";

export const AuthProvider = ({ children }: Props) => {
  const auth = getAuth();
  const { setUsername, setId } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (user.displayName != null) {
          setUsername(user.displayName);
          setId(uid);
          console.log("user logged in");
        }
      } else {
        console.log("user should logout");
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
