//import * as S_signOk from "./AddMentee_styled";
import * as S from "./styled";
import * as S_success from "./SuccessSign_styled";
import React from "react";
import { Link } from "react-router-dom";
import CodeCampusLogo from "../../assets/img/CodeCampusLogo";
import {
  Box,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { StateContext, StateProvider } from "./PrivacyInput";

export default function SuccessSign() {
  const { name } = React.useContext(StateContext);
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
