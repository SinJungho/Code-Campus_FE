import React from "react";
import CodeCampusLogo from "../../../assets/img/CodeCampusLogo";
import { Box, Typography } from "@mui/material";
import { useUserNameStore } from "../../../stores/isSignuped/userSucess";

export default function SuccessSign() {
  const { name } = useUserNameStore();
  console.log(name);
  return (
    <Box>
      <Box sx={{ marginBottom: "1.5rem" }}>
        <Typography sx={{ fontWeight: "bold" }}>{name}님,</Typography>
        <Typography sx={{ fontWeight: "bold" }}>가입을 축하합니다.</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: "0.7rem", marginBottom: "20px" }}>
          코딩을 배우고, 성장하고, 연결하다.
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", marginBottom: "20px" }}>
          대학생과 함께하는 코딩 튜터링
        </Typography>
      </Box>
      <CodeCampusLogo />
    </Box>
  );
}
