import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";

export const Wrapper = styled.div`
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
`;