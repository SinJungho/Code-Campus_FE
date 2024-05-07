import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import footer_logo from "../assets/img/footer_logo.png";
import kakao_icon from "../assets/img/jt-kakao.png";
import youtube_icon from "../assets/img/jt-youtube.png";
import blog_icon from "../assets/img/jt-naver blog.png";
import insta_icon from "../assets/img/jt-instagram.png";

const Footer: React.FC = () => {
  return (
    <S._Footer>
      {/* <S.privacy_area>
        <div className="inner">
          <a href="#">회사 소개</a>
          <a href="#">이용 약관</a>
          <a href="#">개인정보 처리방침</a>
        </div>
      </S.privacy_area>
      <S.service_area>
        <div className="inner">
          <img src={footer_logo} alt="footer_logo" />
          <S.inner_txt>
            <p>(주)머림컴퍼니</p>|
            <p>대표이사 홍길동</p>|
            <p>경기도 안양시 동안구 임곡로 29</p>
            <p>
              평일(월~금) : 10:00~17:00 주말(토요일) : 13:00~17:00 (일요일,
              공휴일 제외)
            </p>
          </S.inner_txt>
          <S.sns_area>
            <Link to="/">
              <img src={kakao_icon} alt="kakao_icon" />
            </Link>
            <Link to="/">
              <img src={youtube_icon} alt="youtube_icon" />
            </Link>
            <Link to="/">
              <img src={insta_icon} alt="insta_icon" />
            </Link>
            <Link to="/">
              <img src={blog_icon} alt="blog_icon" />
            </Link>
          </S.sns_area>
        </div>
      </S.service_area> */}
      <S.footer_bottom>
        <div className="footer_bottom_left footer_info">
          <ul className="footer_info_top">
            <li><Link to="/"><img src={footer_logo} /></Link></li>
            <li><Link to="/policy/privacy">개인정보처리방침</Link></li>
            <li><Link to="/policy/terms-of-service">이용약관</Link></li>
          </ul>
          <div className="footer_info_bottom">
            <span>(주)코드캠퍼스 | </span>
            <span>대표자: 홍길동 | </span>
            <span>
              사업자번호: 000-00-00000
              <Link to="/" target="_blank"> 사업자 정보 확인</Link>
            </span>
            <br />
            <span>통신판매업: 2024-경기안양-0000 | </span>
            <span>개인정보보호책임자: 홍길동 | </span>
            <span>이메일:
              <Link to="mailto:info@email.com">info@email.com</Link></span>
            <br />
            <span>전화번호: 070-0000-0000 | </span>
            <span>주소: 경기도 안양시 대림대학교 전산관 4층</span>
            <br/>
            ©INFLAB. ALL RIGHTS RESERVED
          </div>
        </div>
        <S.sns_area>
          <Link to="/">
            <img src={kakao_icon} alt="kakao_icon" />
          </Link>
          <Link to="/">
            <img src={youtube_icon} alt="youtube_icon" />
          </Link>
          <Link to="/">
            <img src={insta_icon} alt="insta_icon" />
          </Link>
          <Link to="/">
            <img src={blog_icon} alt="blog_icon" />
          </Link>
        </S.sns_area>
      </S.footer_bottom>
    </S._Footer>
  );
};

export default Footer;
