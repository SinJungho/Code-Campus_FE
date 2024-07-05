import React from "react";
import * as S from "./styled";
import LabelBottomNavigation from "./BottomNavigation";
import ResponsiveAppBar from "./AppBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <S._Layout>
      <ResponsiveAppBar />
      <Outlet />
      <LabelBottomNavigation />
    </S._Layout>
  );
};

export default Layout;
