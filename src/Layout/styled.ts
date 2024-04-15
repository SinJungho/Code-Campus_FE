import styled from "styled-components";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

export const _Layout = styled(Layout)``;

export const _Header = styled(Header)`
  width: 100%;
  height: 85px;
  position: fixed;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  color: #727272;
  a {
    display: flex;
    height: 85px;
    font-weight: 300;
    align-items: center;
  }

  a img {
    margin: 15px 45px 15px 15px;
  }

  .header_menu {
    display: flex;
    gap: 60px;
    align-items: center;
  }

  .header_menu_inner {
    display: flex;
    position: relative;
    justify-content: end;
    padding: 0 25px 0 0;
    gap: 40px;
    text-align: center;
  }

  .header_menu .on:hover {
    font-weight: 600;
    border-bottom: 3px solid #095efe;
    color: #095efe;
    transition: 0s;
  }

  .login_inner .btn {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    background: #095efe;
    justify-content: center;
    color: #fff;
  }
`;

export const header_inner = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
`;

export const _Content = styled(Content)`
  /* min-height: 700px; */
`;

export const _Footer = styled(Footer)`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ccc;
  padding: 0;
  background: #fff;

  .inner {
    width: 1200px;
    margin: 0 auto;
  }

  img {
    margin-left: 10px;
  }
`;

export const privacy_area = styled.div`
  width: 1200px;
  height: 65px;
  display: flex;
  margin: 0 auto;
  padding-left: 15px;
  font-weight: 300;
  gap: 40px;
  align-items: center;
  transition: 0s;

  a {
    transition: 0s;
    color: #212121;
  }

  a:hover {
    font-weight: 600;
    color: #212121;
  }
`;

export const service_area = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  background: #f0f0f0;
  padding-top: 40px;
`;

export const inner_txt = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
  margin-left: 10px;

  p {
    font-weight: 300;
    font-size: 15px;
    color: #817f7f;
  }

  p::after {
    content: "|";
    margin-left: 20px;
    margin-right: 7px;
  }

  p:nth-child(3)::after {
    content: none;
  }

  p:nth-child(4) {
    width: 100%;
    margin-top: 5px;
  }

  p:nth-child(4)::after {
    content: none;
  }
`;

export const sns_area = styled.div`
  display: flex;
  position: absolute;
  right: 160px;
  bottom: 0;
  gap: 20px;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
`;
