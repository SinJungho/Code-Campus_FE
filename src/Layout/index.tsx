import React from "react";
import * as S from "./styled";
import { Box, CssBaseline } from "@mui/material";
import LabelBottomNavigation from "./BottomNavigation";
import ResponsiveAppBar from "./AppBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <S._Layout>
      <ResponsiveAppBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      {/* <LabelBottomNavigation /> */}
    </S._Layout>
  );
};

export default Layout;
