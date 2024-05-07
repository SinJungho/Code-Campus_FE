import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import header_logo from "../assets/img/header_logo.png";
import { Button, Menu, MenuProps } from "antd";

const items: MenuProps['items'] = [
  { key: 0, label: '코드캠퍼스 소개' },
  { key: 1, label: '선배 찾기' },
  { key: 2, label: '코드캠퍼스 이벤트' },
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
        // defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        onClick={(e) => { console.log(e.key) }}
      />
      <Button type="primary">
        <Link to="/">
          로그인
        </Link>
      </Button>
    </S._Header >
  );
};

export default Header;
