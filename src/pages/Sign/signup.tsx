import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

// Icons
import WestIcon from "@mui/icons-material/West";

const SignUp: React.FC = () => {
  return (
    <S.Wrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          padding: "0.3rem 24px",
        }}
      >
        <S.LogInTitle>로그인</S.LogInTitle>
        <Link to="/index">
          <WestIcon sx={{ fontSize: "28px" }} />
        </Link>
      </Box>
    </S.Wrapper>
  );
};

export default SignUp;
