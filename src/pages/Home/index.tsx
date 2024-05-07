import React from 'react';
import * as S from "./styled";
import { Link } from "react-router-dom";
import { Carousel } from 'antd';

const list:number[] = [
  1,2,3
];

const Home: React.FC = () => {
  return (
    <S.Wrapper>
      <S.SlideShow>
        <Carousel autoplay>
          {list && list.map((item)=>{
            return(
              <div>
                <h3>{item}</h3>
              </div>
              );
          })}
        </Carousel>
      </S.SlideShow>
    </S.Wrapper>
  );
};

export default Home;