import styled from "styled-components";
import { Box } from "@mui/material";

export const _Layout = styled(Box)`
  background-color: #fff;
  /* flex-direction: column; */
  align-items: center;
  min-height: 100vh;
`;

export const sns_area = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const footer_bottom = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  .footer_bottom_left {
    display: flex;
    flex-direction: column;
  }
  .footer_info_top {
    display: flex;
    padding: 0;
    margin-bottom: 8px;
    list-style: none;
    align-items: center;
    a {
      text-decoration: none;
      font-size: 12px;
      color: #bdbdbd;
      font-weight: 700;
      line-height: 1.5;
    }
  }
  .footer_info_top li + li:before {
    display: inline-block;
    content: "|";
    color: #bdbdbd;
    margin: 0 8px;
    margin-top: -3px;
    font-size: 12px;
    line-height: 1.5;
  }
  .footer_info_bottom {
    font-size: 12px;
    line-height: 1.5;
    color: #bdbdbd;
    a {
      text-decoration: none;
      font-size: 12px;
      color: #bdbdbd;
      font-weight: 700;
    }
  }
`;
