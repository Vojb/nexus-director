"use client";
import React, { memo, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import mainLogo from "assets/logo-nexus.png";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import {  useUserStore } from "@/datarepo/stores";

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const {username,setUsername: setUsernameWithEmail} = useUserStore();
  const handleLogin = () => {
    setUsernameWithEmail(userEmail)

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log("User logged in:", user);
      })
      .catch((error) => {
        // Handle login errors
        console.error("Login error:", error);
      });
  };

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // New user account created
        const user = userCredential.user;
        console.log("New user created:", user);
      })
      .catch((error) => {
        // Handle account creation errors
        console.error("Account creation error:", error);
      });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={mainLogo} width={300} height={300} alt="Picture of the author" />
        <TextField
          sx={{ width: "50%" }}
          margin="normal"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={userEmail}
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <TextField
          sx={{ width: "50%" }}
          margin="normal"
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={userPassword}
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        <Button  variant="contained"  sx={{ width: "50%", margin:1 }} onClick={handleLogin}>
          <Typography>Login {username}</Typography>
        </Button>
        
        <Button variant="outlined" sx={{ width: "50%", margin:1 }} onClick={handleCreateAccount}>
          <Typography>Create account</Typography>
        </Button>
      </Box>
    </Container>
  );
}