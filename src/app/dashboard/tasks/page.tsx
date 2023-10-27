"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/datarepo/firebase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/datarepo/stores";
export default function TasksPage() {
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
  return (
    <Container sx={{}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Tasks Page
        </Typography>
      </Box>
    </Container>
  );
}
