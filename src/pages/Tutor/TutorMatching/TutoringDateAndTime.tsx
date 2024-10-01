import React, { useState, useEffect } from "react";
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
import useLogin from "../../../hooks/useLogin";
import instance from "../../../api/axiosInstance";
import {
  useAuthStore,
  useUserStore,
} from "../../../stores/isLogined/loginStore";

export const TutoringDateAndTime = () => {
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

  const [active, setActive] = useState<number>(-1);
  const [selectedAmPm, setSelectedAmPm] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const [category, setCategory] = useState<string>("BE");
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
    setActive(value);
  };

  const handleSubmit = async () => {
    const selectedDay = date.find((item) => item.id === active)?.date;
    const mentorshipTime = `${selectedAmPm} ${selectedHour}:${selectedMinute}~${selectedHour}:${
      parseInt(selectedMinute) + 30
    }`;

    // Step 1: Log all input values
    console.log("Selected Day:", selectedDay);
    console.log("Selected Time:", mentorshipTime);
    console.log("Selected AM/PM:", selectedAmPm);

    // Validate input before sending request
    if (
      !selectedDay ||
      !selectedAmPm ||
      !selectedHour ||
      !selectedMinute ||
      !category
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    const requestBody = {
      tutorNo: 2, // Use actual tutorNo
      tuteeNo: 1, // Use actual tuteeNo
      mentorshipDay: selectedDay,
      mentorshipTime: mentorshipTime,
      category: "BE",
      note: "test",
    };

    // Step 2: Log the entire request body
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      // Refresh the token before making the request
      await refreshLogin();

      // Get the latest access token
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken) {
        throw new Error("No access token available");
      }

      console.log("API Endpoint:", "/api/mentorship/request");
      console.log("Request Headers:", {
        Authorization: `Bearer ${accessToken.substring(0, 10)}...`, // 보안을 위해 토큰의 일부만 로그
        "Content-Type": "application/json",
      });

      // Making the request with the correct token in the Authorization header
      const response = await instance.post(
        "/api/mentorship/request",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Step 4: Log the successful response
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
    } catch (error: any) {
      // Step 5: Enhanced error logging
      console.error("Error occurred during API request:");
      console.error("Status:", error.response?.status);
      console.error("Error Message:", error.message);
      console.error("Response Data:", error.response?.data);

      // Handle 401 error only once
      if (error.response?.status === 401 && !isErrorHandled) {
        console.error("Authentication failed. Please log in again.");
        setIsErrorHandled(true); // Mark the error as handled to avoid retry loops
      }

      if (error.response?.status === 400) {
        console.error("Bad request: 400", error.response?.data.message);
        // You might want to show this error to the user
      }
    }
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
            className={active === item.id ? "active" : ""}
          >
            {item.date}
          </S_detail.DateButton>
        ))}
      </Box>

      <TutoringTimeDropDownMenu
        selectedAmPm={selectedAmPm}
        setSelectedAmPm={setSelectedAmPm}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        selectedMinute={selectedMinute}
        setSelectedMinute={setSelectedMinute}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: "1rem" }}
        disabled={!isLoggedIn}
      >
        Apply
      </Button>
    </Box>
  );
};

interface TutoringTimeDropDownMenuProps {
  selectedAmPm: string;
  setSelectedAmPm: React.Dispatch<React.SetStateAction<string>>;
  selectedHour: string;
  setSelectedHour: React.Dispatch<React.SetStateAction<string>>;
  selectedMinute: string;
  setSelectedMinute: React.Dispatch<React.SetStateAction<string>>;
}

function TutoringTimeDropDownMenu({
  selectedAmPm,
  setSelectedAmPm,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
}: TutoringTimeDropDownMenuProps) {
  const handleAmPmChange = (event: SelectChangeEvent) => {
    setSelectedAmPm(event.target.value);
    setSelectedHour("");
    setSelectedMinute("");
  };

  const handleHourChange = (event: SelectChangeEvent) => {
    setSelectedHour(event.target.value);
    setSelectedMinute("");
  };

  const handleMinuteChange = (event: SelectChangeEvent) => {
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
          <InputLabel id="amPm-label">오전/오후</InputLabel>
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
          <InputLabel id="minute-label">분</InputLabel>
          <Select
            labelId="minute-select"
            id="minute-select"
            value={selectedMinute}
            label="분"
            onChange={handleMinuteChange}
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
