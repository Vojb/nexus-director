"use client";
import React, { memo, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Button, TextField } from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import mainLogo from "@/assets/logo-nexus.png";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/datarepo/firebase";
const app = initializeApp(firebaseConfig);

import { useUserStore } from "@/datarepo/stores";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState(false);

  const router = useRouter();

  // Initialize Firebase Authentication and get a reference to the service
  const { username, setUsername: setUsernameWithEmail } = useUserStore();
  const handleLogin = () => {
    setUsernameWithEmail(userEmail);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // User logged in successfully
        router.push("/dashboard");
        const user = userCredential.user;
        console.log("User logged in:", user);
      })
      .catch((error) => {
        setErrorSignIn(true);
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
        <Image src={mainLogo} width={300} height={300} alt="Logo" />
        <TextField
          sx={{ width: "50%" }}
          margin="normal"
          id="email"
          label="Email"
          error={errorSignIn}
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
          error={errorSignIn}
          variant="outlined"
          type="password"
          value={userPassword}
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        {errorSignIn && (
          <Alert severity="error" sx={{ width: "50%", margin: 1 }}>
            Wrong password or email
          </Alert>
        )}
        <Button
          variant="contained"
          sx={{ width: "50%", margin: 1 }}
          onClick={handleLogin}
        >
          <Typography>Login </Typography>
        </Button>

        <Button
          variant="outlined"
          sx={{ width: "50%", margin: 1 }}
          onClick={handleCreateAccount}
        >
          <Typography>Create account</Typography>
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
