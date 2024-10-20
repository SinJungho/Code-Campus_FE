import React, { useState, useEffect } from "react";
import * as S_detail from "../TutorDetail/TutorDetail_styled";
import {
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  TextField,
} from "@mui/material";
import useLogin from "../../../hooks/useLogin";
import {
  useAuthStore,
  useUserStore,
} from "../../../stores/isLogined/loginStore";

interface TutoringDateAndTimeProps {
  onDataChange: (days: string[], time: string, notes: string) => void; // notes 추가
}

export const TutoringDateAndTime: React.FC<TutoringDateAndTimeProps> = ({ onDataChange }) => {
  const date = [
    { id: 1, date: "월요일" },
    { id: 2, date: "화요일" },
    { id: 3, date: "수요일" },
    { id: 4, date: "목요일" },
    { id: 5, date: "금요일" },
    { id: 6, date: "토요일" },
    { id: 7, date: "일요일" },
  ];

  const { refreshLogin } = useLogin();
  const { isLoggedIn } = useAuthStore();
  const { userEmail } = useUserStore();

  const [active, setActive] = useState<number[]>([]);
  const [selectedStartHour, setSelectedStartHour] = useState<string>("");
  const [selectedEndHour, setSelectedEndHour] = useState<string>("");
  const [notes, setNotes] = useState<string>(""); // 추가된 상태
  const [isErrorHandled, setIsErrorHandled] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn && !isErrorHandled) {
      refreshLogin().catch(() => {
        setIsErrorHandled(true);
      });
    }
  }, [isLoggedIn, refreshLogin, isErrorHandled]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (active.includes(value)) {
      setActive(active.filter((id) => id !== value));
    } else {
      setActive([...active, value]);
    }
    
    // 실시간 데이터 전달
    const selectedDays = active
      .map((id) => date.find((item) => item.id === id)?.date)
      .filter(Boolean) as string[];
    const mentorshipTime = `${selectedStartHour}~${selectedEndHour}`;
    onDataChange(selectedDays, mentorshipTime, notes);
  };

  const handleStartHourChange = (event: SelectChangeEvent<string>) => {
    setSelectedStartHour(event.target.value);
    setSelectedEndHour(""); // 초기화

    // 실시간 데이터 전달
    const selectedDays = active
      .map((id) => date.find((item) => item.id === id)?.date)
      .filter(Boolean) as string[];
    const mentorshipTime = `${event.target.value}~${selectedEndHour}`;
    onDataChange(selectedDays, mentorshipTime, notes);
  };

  const handleEndHourChange = (event: SelectChangeEvent<string>) => {
    setSelectedEndHour(event.target.value);

    // 실시간 데이터 전달
    const selectedDays = active
      .map((id) => date.find((item) => item.id === id)?.date)
      .filter(Boolean) as string[];
    const mentorshipTime = `${selectedStartHour}~${event.target.value}`;
    onDataChange(selectedDays, mentorshipTime, notes);
  };

  const handleSubmit = () => {
    const selectedDays = active
      .map((id) => date.find((item) => item.id === id)?.date)
      .filter(Boolean) as string[];
    const mentorshipTime = `${selectedStartHour}~${selectedEndHour}`;

    // 데이터가 유효한지 체크
    if (!selectedDays.length || !selectedStartHour || !selectedEndHour) {
      console.error("Please fill in all required fields");
      return;
    }

    // 상위 컴포넌트로 데이터 전달
    onDataChange(selectedDays, mentorshipTime, notes); // notes 추가
  };

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
        {date.map((item) => (
          <S_detail.DateButton
            value={item.id.toString()}
            key={item.id}
            variant="outlined"
            size="large"
            onClick={handleClick}
            className={active.includes(item.id) ? "active" : ""}
          >
            {item.date}
          </S_detail.DateButton>
        ))}
      </Box>

      <TutoringTimeDropDownMenu
        selectedStartHour={selectedStartHour}
        setSelectedStartHour={handleStartHourChange} // 수정된 부분
        selectedEndHour={selectedEndHour}
        setSelectedEndHour={handleEndHourChange} // 수정된 부분
      />

      {/* 텍스트 인풋 추가 */}
      <Box sx={{ marginTop: "2rem" }}>
        <InputLabel>선배에게 하고싶은 말</InputLabel>
        <TextField
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value); // 메모 상태 업데이트
            // 실시간 데이터 전달
            const selectedDays = active
              .map((id) => date.find((item) => item.id === id)?.date)
              .filter(Boolean) as string[];
            const mentorshipTime = `${selectedStartHour}~${selectedEndHour}`;
            onDataChange(selectedDays, mentorshipTime, e.target.value);
          }}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
      </Box>
    </Box>
  );
}

interface TutoringTimeDropDownMenuProps {
  selectedStartHour: string;
  setSelectedStartHour: (event: SelectChangeEvent<string>) => void; // 수정된 부분
  selectedEndHour: string;
  setSelectedEndHour: (event: SelectChangeEvent<string>) => void; // 수정된 부분
}

function TutoringTimeDropDownMenu({
  selectedStartHour,
  setSelectedStartHour,
  selectedEndHour,
  setSelectedEndHour,
}: TutoringTimeDropDownMenuProps) {
  const timeOptions = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}:00` : `${i}:00`
  );

  const filteredEndHours = timeOptions.filter((time) => time > selectedStartHour);

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <InputLabel>시작 시간</InputLabel>
      <Select
        value={selectedStartHour}
        onChange={setSelectedStartHour}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{ minWidth: "120px" }}
      >
        <MenuItem value="">
          <em>시작 시간</em>
        </MenuItem>
        {timeOptions.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>

      <InputLabel sx={{ marginTop: "1rem" }}>종료 시간</InputLabel>
      <Select
        value={selectedEndHour}
        onChange={setSelectedEndHour}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{ minWidth: "120px" }}
      >
        <MenuItem value="">
          <em>종료 시간</em>
        </MenuItem>
        {filteredEndHours.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default TutoringDateAndTime;