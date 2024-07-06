import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Checkbox } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

// checkbox
const checkIconSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" viewBox="0 96 960 960" width="20">
    <path d="M384 840l-240-240 56-56 184 184 392-392 56 56-448 448z"/>
  </svg>
`);

export const CheckInput = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1.5px solid gainsboro;
  border-radius: 50%;
  background-color: gray;
  background-image: url("data:image/svg+xml,${checkIconSvg}");
  background-repeat: no-repeat;
  background-position: 50%;
  opacity: 0.5;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,${checkIconSvg}");
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: skyblue;
  }
`;

export const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

export const CheckText = styled.p`
  margin-left: 1.5rem;
`;

export const FindId = styled.a`
  font-size: 1rem;
`;

export const Line = styled.span`
  display: inline-block;
  background-color: black;
  margin: 0.5rem;
  height: 100%;
  width: 2px;
`;

export const FindPw = styled.a`
  font-size: 1rem;
`;
