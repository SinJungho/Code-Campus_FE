import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Box,
  Chip,
  Typography,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";

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

// 선배 매칭 페이지
export const MatchingButton = styled(Button)`
  &.MuiButton-root {
    border-radius: 30px;
    font-size: 0.53rem;
    font-weight: bold;
    padding: 0.3rem 0.62rem;
    border: 1.5px solid #1564ff;
    color: #1564ff;
    background-color: #f5f5f5;
  }
`;

export const LevelChip = styled(Chip)`
  & .MuiChip-label {
    font-size: 0.5rem;
    font-weight: bold;
  }
`;
// 선호 요일 및 시간
export const DateButton = styled(Button)`
  &.MuiButton-root {
    border-radius: 50%;
    border: 1px solid rgba(22, 22, 22, 0.2);
    font-size: 0.7rem;
    font-weight: bold;
    padding: 0.7rem 0.95rem;
    color: #333;
    background-color: #f5f5f5;
  }
`;

/***
 * 시간 드롭다운 메뉴
 */

/***
 *
 * 거주 지역
 *
 */

export const AreaDropDownMenu = styled(FormControl)`
  & .MuiInputLabel-root {
    font-size: 0.55rem;
    font-weight: bold;

    &.MuiInputLabel-shrink {
      transform: translate(14px, -6px) scale(1);
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    legend {
      font-size: 0.45rem;

      span {
        padding-right: 5px;
      }
    }
  }

  & .MuiSelect-select {
    font-size: 0.5rem;
    padding-top: 0.35rem;
    padding-bottom: 0.3rem;
  }

  & .MuiSelect-root {
    border-radius: 12px;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      top: -2px;
    }
  }
`;

export const AreaDropDownMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-size: 0.5rem;
  }
`;
