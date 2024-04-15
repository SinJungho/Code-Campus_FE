import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import { CheckSquareFilled } from "@ant-design/icons";
import header_logo from "../assets/img/header_logo.png";

const Header: React.FC = () => {
  return (
    <S._Header>
      <S.header_inner>
        <ul className="header_menu">
          <Link to="/">
            <img src={header_logo} alt="header_logo" />
          </Link>
          <li>
            <Link to="/" className="on">
              클래스 소개
            </Link>
          </li>
          <li>
            <Link to="/" className="on">
              클래스 탐색
            </Link>
          </li>
          <li>
            <Link to="/" className="on">
              내 주변 클래스
            </Link>
          </li>
          <li>
            <Link to="/" className="on">
              커뮤니티
            </Link>
          </li>
        </ul>
        <div className="login_inner">
          <Link to="/" className="btn">
            로그인
          </Link>
        </div>
      </S.header_inner>
    </S._Header>
  );
};

export default Header;
