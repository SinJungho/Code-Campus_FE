import React, { useContext, useEffect, useState } from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import mentees from "../../mock-data/mentees";
import { Box, Avatar, Badge, Button, Typography } from "@mui/material";

export default function MenteeControl() {
  return (
    <Box>
      {mentees.map((mentee, index) => (
        <S.CardWrap
          key={index}
          sx={{
            mt: "2rem",
            padding: "1.5rem",
            bgcolor: "#f5f5f5",
            borderRadius: ".8rem",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "2.8rem",
                height: "2.8rem",
                fontSize: "1.2rem",
                color: "#999",
                bgcolor: "#fff",
                display: "flex",
                alignContent: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                mr: "1.5rem",
              }}
            >
              {mentee.name.charAt(0)}
            </Avatar>
            <S.CardTextDiv>
              <p>{`${mentee.day} ${mentee.amPm} ${mentee.startTime} ~ ${mentee.endTime}`}</p>

              <Typography sx={{ fontWeight: "bold", color: "black" }}>
                {mentee.name} 후배님
              </Typography>
            </S.CardTextDiv>
          </Box>
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                borderRadius: 5,
                padding: ".2rem 1rem",
                fontSize: "0.65rem",
                fontWeight: "bold",
              }}
            >
              상세보기
            </Button>
          </Link>
        </S.CardWrap>
      ))}
    </Box>
  );
}
