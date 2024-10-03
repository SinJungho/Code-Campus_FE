import React, { useContext, useEffect, useState } from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import mentees from "../../mock-data/mentees";
import {
  Box,
  Avatar,
  Badge,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const data = [
  { id: 1, text: "웹개발" },
  { id: 2, text: "프론트엔드" },
  { id: 3, text: "리액트" },
];

export default function MatchRequest() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <Badge color="info" variant="dot" overlap="circular">
                <Typography sx={{ fontWeight: "bold", color: "black" }}>
                  {mentee.name} 후배님
                </Typography>
              </Badge>
            </S.CardTextDiv>
          </Box>
          {/* <Link to="/menteeInfo"> */}
          <Button
            variant="contained"
            sx={{
              borderRadius: 5,
              padding: ".2rem 1rem",
              fontSize: "0.65rem",
              fontWeight: "bold",
            }}
            onClick={handleClickOpen}
          >
            상세보기
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                  textAlign: "center",
                }}
              >
                우예인 후배님의 상세 정보
              </Typography>
            </DialogTitle>

            <DialogContent>
              <div>
                {data.map((item) => (
                  <S.MenteeChip label={item.text} />
                ))}
              </div>
              <Box sx={{ marginBottom: "0.7rem" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.65rem",
                  }}
                >
                  선호 요일 및 시간
                </Typography>
                <Typography sx={{ fontSize: "0.56rem" }}>
                  매주 수요일 오후 6~7시
                </Typography>
              </Box>
              <Box sx={{ marginBottom: "0.7rem" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "0.55rem" }}>
                  선배에게 하고 싶은 말
                </Typography>
                <Typography sx={{ fontSize: "0.56rem" }}>
                  제발 절 간택 해주세요
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{ fontSize: "0.56rem" }}
                variant="contained"
              >
                거절하기
              </Button>
              <Button
                onClick={handleClose}
                autoFocus
                sx={{ fontSize: "0.56rem" }}
                variant="contained"
              >
                수락하기
              </Button>
            </DialogActions>
          </Dialog>
          {/* </Link> */}
        </S.CardWrap>
      ))}
    </Box>
  );
}
