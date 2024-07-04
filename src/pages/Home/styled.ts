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
    align-items: center;
    h1{
        width: 90%;
        font-size: 1rem;
    }
`;

export const CardWrap = styled(Paper)`
    width: 90%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
`;

export const CardTextDiv = styled.div`
    height: 4rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span{
        font-size: .9rem;
        color: #aaa;
    }
    p{
        font-size: .9rem;
    }
`;