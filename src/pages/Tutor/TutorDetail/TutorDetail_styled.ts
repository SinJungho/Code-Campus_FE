import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Chip, Typography } from "@mui/material";

export const Wrapper = styled(Box)`
  padding: 24px;
  margin-bottom: 8rem;
`;

export const LogInTitle = styled.h4`
  font-size: 0.55rem;
`;

export const KeywordChip = styled(Chip)`
  & .MuiChip-label {
    font-size: 0.5rem;
    font-weight: bold;
  }
`;

export const Title = styled.h4`
  font-size: 0.85rem;
  font-weight: bold;
  margin-right: 3px;
`;

export const Text = styled(Typography)`
  &.MuiTypography-root {
    font-size: 0.65rem;
  }
`;

export const LinkText = styled(Link)`
  display: block;
  font-weight: bold;
  font-size: 0.65rem;
  text-decoration: underline;
  margin-top: 20px;
`;

export const ListText = styled.li`
  font-size: 0.6rem;
  font-weight: bold;
  list-style: disc;
  padding-left: 10px;
  margin-left: 24px;
  &::marker {
    color: #1564ff;
  }
`;
