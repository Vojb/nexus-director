"use client";
import React, { useEffect, useState } from "react";
import { firebaseService } from "@/datarepo/firebase";
import { List, ListItem, Container, Box, Typography } from "@mui/material";

export default function StarredPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Set up a real-time listener for changes to the questions
    firebaseService.listenForQuestions((data: Question[]) => {
      setQuestions(data);
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe from the real-time listener
    };
  }, []);

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
        <Typography variant="h4">Questions ({questions.length})</Typography>
        <List>
          {questions.map((question, index) => (
            <ListItem key={index}>
              <Box>
                <Typography>QuestionType :{question.questionType}</Typography>
                <Typography>Answer: {question.answer} </Typography>
                <Typography>hej</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
