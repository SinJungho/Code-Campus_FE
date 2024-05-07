import styled from "styled-components";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

export const _Layout = styled(Layout)`
  background-color: #fff;
  display: flex;
  flex-direction:column;
  align-items: center;
`;

export const _Header = styled(Header)`
  width: 60%;
  display: flex;
  align-items: center;
  background-color: transparent;
  img{
  }
  .ant-menu{
    li{
      user-select: none;
    }
  }
`;

export const _Content = styled(Content)`
  width: 60%;
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
    width: 60%;
    margin: 0 auto;
  }

  img {
    margin-left: 10px;
  }
`;

export const privacy_area = styled.div`
  width: 60%;
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
