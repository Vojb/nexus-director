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

function DashboardPage() {
  return (
    <Container>
    
    </Container>
  );
}

export default DashboardPage;
