import { Box, Button, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";

export const Wrapper = styled(Box)`
  width: 100%;
  /* min-height: 1600px; */
`;

export const CarouselDiv = styled(Carousel)`
  padding: 0rem 2rem;
`;

export const BannerPaper = styled(Paper)`
  p {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: 0rem;
  }
  p:nth-of-type(2) {
    color: #1564ff;
  }
  b {
    line-height: 1rem;
  }

  .css-ic3g2h-MuiPaper-root {
    padding-top: 0.9rem;
  }
`;

export const SearchDiv = styled(Box)`
  padding: 3rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 1.3rem;
  }
`;

export const CardDiv = styled(Box)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    position: relative;
    width: 90%;
    left: 1%;
    padding: 1rem;
    font-size: 1.2rem;
  }
`;

export const CardWrap = styled(Paper)`
  width: 90%;
  background-color: #f5f5f5;
  display: flex;
  box-sizing: border-box;
  padding: 2rem !important;
  align-items: center;
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
    font-size: 0.9rem;
    color: #aaa;
  }
  p {
    font-size: 0.9rem;
    width: 10rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const FilterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const select_wrap = styled.div`
  .dxRkuN {
    width: 30%;
    position: relative;
    left: 23rem;
  }
  display: flex !important;
  box-sizing: border-box;
`;
