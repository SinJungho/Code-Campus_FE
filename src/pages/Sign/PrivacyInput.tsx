import * as S from "./styled";
import React from "react";
import { Box } from "@mui/material";

export default function PrivacyInput() {
  return (
    <Box>
      <S.SignTextInput id="outlined-required" placeholder="이메일" />
    </Box>
  );
}
