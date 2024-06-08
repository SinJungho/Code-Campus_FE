import React from 'react';
import * as S from "./styled";
import { Link } from "react-router-dom";
import { ArrowRight } from '@mui/icons-material';

const list: number[] = [
  1, 2, 3
];

const Home: React.FC = () => {
  return (
    <S.Wrapper>
      <S.CarouselDiv navButtonsAlwaysInvisible>
        <S.BannerPaper sx={{
          backgroundColor: '#E7F5FF',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <p>선배와 후배가 함께 성장하는</p>
          <p>코드 캠퍼스</p>
          <Link to='/'>
            <ArrowRight />서비스 소개
          </Link>
        </S.BannerPaper>
      </S.CarouselDiv>
      
    </S.Wrapper>
  );
};

export default Home;