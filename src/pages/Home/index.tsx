import React from 'react';
import * as S from "./styled";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from '@mui/icons-material';
import { Avatar, Button, IconButton, InputBase, Paper } from '@mui/material';
import students from '../../mock-data/students';

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
          <Link to='/about'>
            <Paper sx={{ boxShadow: 'none', backgroundColor: 'transparent', display: 'flex', alignContent: 'center', pt: '2rem' }}>
              <ArrowRight />
              <b>서비스 소개</b>
            </Paper>
          </Link>
        </S.BannerPaper>
      </S.CarouselDiv>
      <S.SearchDiv>
        <h1>어떤 선배님이 필요하세요?</h1>
        <Paper
          component="form"
          sx={{
            p: '.4rem .6rem', display: 'flex', alignItems: 'center', width: '90%', mt: '2rem',
            backgroundColor: '#f0f0f0', color: '#333', boxShadow: 'none', borderRadius: '1.2rem'
          }}
        >
          <InputBase
            sx={{
              ml: 1, flex: 1, pl: 5, fontWeight: 500, fontSize: '.8rem', color: '#333',
              'input': {
                '&::placeholder': {
                  color: '#000',
                  fontWeight: 600
                }
              }
            }}
            placeholder="검색어 입력"
            inputProps={{ 'aria-label': '검색어 입력' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search sx={{ color: '#1564ff' }} />
          </IconButton>
        </Paper>
      </S.SearchDiv>
      <S.CardDiv>
        <h1>코캠 인기 선배님</h1>
        {students.map((student, index) => (
          <S.CardWrap key={index} sx={{
            mt: '2rem', padding:'1.5rem', bgcolor: '#f5f5f5', borderRadius: '.8rem', boxShadow: 'none'
          }}>
            <Avatar sx={{
              width:'4rem', height:'4rem', fontSize:'1rem', color:'#999', bgcolor: '#fff',
              display: 'flex', alignContent:'center', flexWrap: 'wrap', justifyContent:'center',
              mr:'1.5rem'
            }}>{student.name.charAt(0)}</Avatar>
            <S.CardTextDiv>
              <div>{student.specialties.map((value, idx)=>(<span key={idx}>#{value} </span>))}</div>
              <p>{student.university+' '+student.department}</p>
              <b>{student.name} 선배님</b>
            </S.CardTextDiv>
            <Link to="/login">
                <Button variant="contained" sx={{ borderRadius: 5, padding: '.2rem 1rem', fontSize: '0.75rem' }}>
                  상세보기
                </Button>
              </Link>
          </S.CardWrap>
        ))}
      </S.CardDiv>
    </S.Wrapper>
  );
};

export default Home;