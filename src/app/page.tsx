"use client";
import React, { memo, useEffect, useState } from "react";
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

import { onAuthStateChanged } from "firebase/auth";

import { useUserStore } from "@/datarepo/stores";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/datarepo/firebase";

function LoginPage() {
  const app = initializeApp(firebaseConfig);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState(false);

  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user, "user");
        router.push("/dashboard");
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const { username, setUsername: setUsernameWithEmail } = useUserStore();
  const handleLogin = () => {
    setUsernameWithEmail(userEmail);

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // User logged in successfully
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
    router.push("/createaccount");
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
          sx={{ width: "80%" }}
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
          sx={{ width: "80%" }}
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
          <Alert severity="error" sx={{ width: "80%", margin: 1 }}>
            Wrong email or password.
          </Alert>
        )}
        <Button
          variant="contained"
          sx={{ width: "80%", margin: 1 }}
          onClick={handleLogin}
        >
          <Typography>Login </Typography>
        </Button>

        <Button
          variant="outlined"
          sx={{ width: "80%", margin: 1 }}
          onClick={handleCreateAccount}
        >
          <Typography>Create account</Typography>
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
