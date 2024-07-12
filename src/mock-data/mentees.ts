// 타입 정의
import { Badge, BadgeProps } from "@mui/material";
import React from "react";
interface Mentee {
  day: string;
  amPm: string;
  startTime: string;
  endTime: string;
  profilePictureUrl: string;
  name: string;
}

// 더미 데이터
const mentees: Mentee[] = [
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile1.jpg",
    name: "김철수",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile2.jpg",
    name: "이영희",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile3.jpg",
    name: "박지수",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile4.jpg",
    name: "최민호",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile5.jpg",
    name: "정혜진",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile6.jpg",
    name: "강민지",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile7.jpg",
    name: "조현우",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile8.jpg",
    name: "오수진",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile9.jpg",
    name: "임도현",
  },
  {
    day: "평일",
    amPm: "오후",
    startTime: "4시",
    endTime: "6시",
    profilePictureUrl: "https://example.com/profile10.jpg",
    name: "배성훈",
  },
];

export default mentees;
