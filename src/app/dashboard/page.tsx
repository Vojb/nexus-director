"use client";
import React, { memo, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/datarepo/firebase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/datarepo/stores";
function DashboardPage() {
  const { setUsername, setId } = useUserStore();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (user.displayName != null) {
          setUsername(user.displayName);
          setId(uid);
          router.push("/");
          console.log("user logged in");
        }
      } else {
        console.log("user should logout");
        router.push("/");
      }
    });
  }, []);

  return <Container></Container>;
}

export default DashboardPage;
