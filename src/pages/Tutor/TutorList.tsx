import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Tab,
  Tabs,
  Badge,
} from "@mui/material";
import TutorDetail from "./TutorDetail";

const TutorList: React.FC = () => {
  return (
    <div>
      <TutorDetail />
    </div>
  );
};
export default TutorList;
