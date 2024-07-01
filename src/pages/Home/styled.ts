import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";

export const Wrapper = styled(Box)`
    width: 100%;
    /* min-height: 1600px; */
`;

export const CarouselDiv = styled(Carousel)`
    padding: 1rem;
`;

export const BannerPaper = styled(Paper)`
    p{
        font-weight: 800;
        font-size: 1.5rem;
        letter-spacing: 0rem;
    }
    p:nth-of-type(2){
        color: #1564ff;
    }
    b{
        line-height: 1.5rem;
    }
`;

export const SearchDiv = styled(Box)`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        font-size: 1.2rem;
    }
`;

export const CardDiv = styled(Box)`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

export const CardWrap = styled(Paper)`
    width: 90%;
`;