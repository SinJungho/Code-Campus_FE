import React, { useState } from "react";
import * as S_detail from "../TutorDetail/TutorDetail_styled";
import {
  Box,
  Button,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { data } from "../../../mock-data/timeData";

export const TutoringDateAndTime = () => {
  const date = [
    { id: 1, date: "월" },
    { id: 2, date: "화" },
    { id: 3, date: "수" },
    { id: 4, date: "목" },
    { id: 5, date: "금" },
    { id: 6, date: "토" },
    { id: 7, date: "일" },
  ];
  return (
    <Box sx={{ marginTop: "1.5rem" }}>
      <S_detail.Title>선호 요일 및 시간</S_detail.Title>
      <Typography sx={{ fontSize: "0.7rem", marginTop: "1rem" }}>
        선호 요일
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "1rem",
        }}
      >
        {date.map((index) => {
          return (
            <S_detail.DateButton key={index.id} variant="outlined" size="large">
              {index.date}
            </S_detail.DateButton>
          );
        })}
      </Box>
      <TutoringTimeDropDownMenu />
    </Box>
  );
};

// 거주 지역
function TutoringTimeDropDownMenu() {
  const [selectedAmPm, setSelectedAmPm] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");

  const handleAmPmChange = (event: SelectChangeEvent) => {
    setSelectedAmPm(event.target.value);
    setSelectedHour("");
    setSelectedMinute("");
  };

  const handleHourChange = (event: SelectChangeEvent) => {
    setSelectedHour(event.target.value);
    setSelectedMinute("");
  };

  const handleDongChange = (event: SelectChangeEvent) => {
    setSelectedMinute(event.target.value);
  };

  const hourOptions = selectedAmPm ? Object.keys(data[selectedAmPm]) : [];

  const minuteOptions =
    selectedAmPm && selectedHour
      ? Object.keys(data[selectedAmPm][selectedHour])
      : [];

  return (
    <Box
      sx={{
        minWidth: 120,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography sx={{ fontSize: "0.7rem", marginTop: "1rem" }}>
        선호 시간
      </Typography>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <S_detail.AreaDropDownMenu fullWidth>
          <InputLabel id="sido-label">오전/오후</InputLabel>
          <Select
            labelId="amPm-label"
            id="amPm-select"
            value={selectedAmPm}
            label="오전/오후"
            onChange={handleAmPmChange}
          >
            {Object.keys(data).map((amPm) => (
              <S_detail.AreaDropDownMenuItem key={amPm} value={amPm}>
                {amPm}
              </S_detail.AreaDropDownMenuItem>
            ))}
          </Select>
        </S_detail.AreaDropDownMenu>
        <S_detail.AreaDropDownMenu fullWidth>
          <InputLabel id="hour-label">시간</InputLabel>
          <Select
            labelId="hour-label"
            id="hour-select"
            value={selectedHour}
            label="시간"
            onChange={handleHourChange}
            disabled={!selectedAmPm}
          >
            {hourOptions.map((hour) => (
              <S_detail.AreaDropDownMenuItem key={hour} value={hour}>
                {hour}
              </S_detail.AreaDropDownMenuItem>
            ))}
          </Select>
        </S_detail.AreaDropDownMenu>
        <S_detail.AreaDropDownMenu fullWidth>
          <InputLabel id="dong-label">분</InputLabel>
          <Select
            labelId="minute-label"
            id="minute-select"
            value={selectedMinute}
            label="분"
            onChange={handleDongChange}
            disabled={!selectedHour}
          >
            {minuteOptions.map((minute) => (
              <S_detail.AreaDropDownMenuItem key={minute} value={minute}>
                {minute}
              </S_detail.AreaDropDownMenuItem>
            ))}
          </Select>
        </S_detail.AreaDropDownMenu>
      </Box>
    </Box>
  );
}

export default TutoringDateAndTime;
