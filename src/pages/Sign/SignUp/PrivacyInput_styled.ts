import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, TextField, Checkbox, Typography } from "@mui/material";

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

export const TextInput = styled(TextField)`
  & .MuiOutlinedInput-root {
    min-width: 250px;
    font-size: 0.5rem;
    border-radius: 10px;
  }
`;

export const PrivacyCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    width: 0.7rem;
    height: 0.7rem;
  }
`;

export const PrivacyText = styled(Typography)`
  &&.bold {
    font-weight: bold;
    font-size: 0.7rem;
  }
  &.MuiTypography-root {
    font-size: 0.5rem;
    font-weigth: bold;
  }
`;
