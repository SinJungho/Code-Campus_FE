import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import { CheckSquareFilled } from "@ant-design/icons";
import header_logo from "../assets/img/header_logo.png";
import { Menu, MenuProps } from "antd";

const items: MenuProps['items'] = [
  { key: 0, label: '클래스 소개' },
  { key: 1, label: '클래스 탐색' },
  { key: 2, label: '내 주변 클래스' },
  { key: 3, label: '커뮤니티' }
];

const Header: React.FC = () => {
  return (
    <S._Header>
      <Link to="/">
        <img src={header_logo} alt="header_logo" />
      </Link>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        onClick={(e)=>{console.log(e.key)}}
      />
      <Link to="/" className="btn">
        로그인
      </Link>
      {/* <S.header_inner>
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
      </S.header_inner> */}
    </S._Header >
  );
};

export default Header;
