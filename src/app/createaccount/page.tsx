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
  updateProfile,
} from "firebase/auth";
import Image from "next/image";
import mainLogo from "@/assets/logo-nexus.png";
import { useUserStore } from "@/datarepo/stores";
import { useRouter } from "next/navigation";

function CreateAccountPage() {
  const [displayName, setDisplayName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState(false);

  const router = useRouter();
  const { username, setUsername: setUsernameWithEmail } = useUserStore();
  const handleBack = () => {
    router.back();
  };

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // New user account created
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            // Profile updated!
            console.log("New user created:", user);

            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
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
        <Typography typography={"h3"}>Create your account</Typography>
        <TextField
          sx={{ width: "80%" }}
          margin="normal"
          id="username"
          label="Username"
          error={errorSignIn}
          variant="outlined"
          value={displayName}
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
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
          onClick={handleCreateAccount}
        >
          <Typography>Create account</Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "80%", margin: 1 }}
          onClick={handleBack}
        >
          <Typography>Back</Typography>
        </Button>
      </Box>
    </Container>
  );
}

export default CreateAccountPage;
