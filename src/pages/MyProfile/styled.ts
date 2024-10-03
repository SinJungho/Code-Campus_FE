import styled from "styled-components";
import { Badge, Box, Chip, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export const LogInTitle = styled.h4`
  font-size: 0.55rem;
`;

export const CardWrap = styled(Paper)`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  box-sizing: border-box;
  padding: 1.5rem !important;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem !important;

  .css-kem3np-MuiAvatar-root {
    font-size: 1.5rem;
  }
`;

export const CardTextDiv = styled.div`
  height: 4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  span {
    font-size: 0.65rem;
    color: #aaa;
  }
  p {
    font-size: 0.9rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const TabBadge = styled(Badge)`
  & .MuiBadge-badge {
    font-size: 0.4rem;
    position: absolute;
    right: -10px;
  }
`;

export const MenteeChip = styled(Chip)`
  & .MuiChip-label {
    font-size: 14px;
  }
  margin-right: 15px;
  margin-bottom: 0.5rem;
`;
