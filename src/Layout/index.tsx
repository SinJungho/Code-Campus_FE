import React from "react";
import * as S from "./styled";
import { Box, CssBaseline } from "@mui/material";
import LabelBottomNavigation from "./BottomNavigation";
import ResponsiveAppBar from "./AppBar";

interface LayoutProps {
  children: React.ReactNode; // Layout 컴포넌트의 자식으로 받을 수 있는 컴포넌트 타입 정의
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <S._Layout>
      <ResponsiveAppBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {/* <LabelBottomNavigation /> */}
    </S._Layout>
  );
};

export default Layout;
