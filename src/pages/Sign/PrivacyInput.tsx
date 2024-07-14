import * as S_privacy from "./PrivacyInput_styled";
import * as S from "./styled";
import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";

interface NameState {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
const defaultNameState: NameState = {
  name: "회원",
  setName: () => {},
};

export const StateContext = createContext<NameState>(defaultNameState);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>("");

  return (
    <StateContext.Provider value={{ name, setName }}>
      {children}
    </StateContext.Provider>
  );
};

export default function PrivacyInput() {
  return <PrivacyInputContent />;
}

export function PrivacyInputContent() {
  const { name, setName } = React.useContext(StateContext);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <S.SignTextInput
        fullWidth
        required
        type="email"
        id="email-required"
        label="이메일"
        variant="outlined"
      />
      <S.SignTextInput
        fullWidth
        required
        type="password"
        id="password-required"
        label="비밀번호"
        variant="outlined"
      />
      <S.SignTextInput
        fullWidth
        required
        type="password"
        id="repeatPassword-required"
        label="비밀번호 확인"
        variant="outlined"
      />
      <S.SignTextInput
        fullWidth
        required
        type="text"
        id="name-required"
        label="이름"
        variant="outlined"
        value={name}
        onChange={handleName}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <S.SignTextInput
          fullWidth
          required
          type="tel"
          id="phone-required"
          label="전화번호"
          variant="outlined"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <S_privacy.TextInput
            id="outlined-basic"
            placeholder="인증 번호를 입력해주세요."
            label=""
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ fontSize: "0.5rem", fontWeight: "bold" }}
          >
            인증하기
          </Button>
        </Box>
      </Box>
      {/* 사용자 약관 동의 체크 박스 */}
      <Box>
        <IndeterminateCheckbox />
      </Box>
    </Box>
  );
}

function IndeterminateCheckbox() {
  const [checkList, setCheckList] = useState<string[]>([]);
  const check = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((choice) => choice !== e.target.name));
  };
  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckList(["terms", "privacy", "marketing"])
      : setCheckList([]);
  };

  return (
    <Box>
      {/* 이용약관 전체 동의 체크박스 */}
      <S_privacy.Wrapper>
        <FormControlLabel
          value="end"
          control={
            <S_privacy.PrivacyCheckbox
              name="all"
              onChange={checkAll}
              checked={checkList.length === 3 ? true : false}
            />
          }
          label={
            <S_privacy.PrivacyText className="bold">
              이용약관 전체 동의
            </S_privacy.PrivacyText>
          }
          labelPlacement="end"
        />
      </S_privacy.Wrapper>
      {/* 이용약관 동의 체크 박스 */}
      <S_privacy.Wrapper>
        <FormControlLabel
          value="end"
          control={
            <S_privacy.PrivacyCheckbox
              name="terms"
              onChange={check}
              checked={checkList.includes("terms") ? true : false}
            />
          }
          label={
            <S_privacy.PrivacyText>
              이용약관 동의<S.Star>*</S.Star>
            </S_privacy.PrivacyText>
          }
          labelPlacement="end"
        />
      </S_privacy.Wrapper>
      {/* 개인 정보 취급 방침 동의 체크박스 */}
      <S_privacy.Wrapper>
        <FormControlLabel
          value="end"
          control={
            <S_privacy.PrivacyCheckbox
              name="privacy"
              onChange={check}
              checked={checkList.includes("privacy") ? true : false}
            />
          }
          label={
            <S_privacy.PrivacyText>
              개인정보 취급 방침 동의<S.Star>*</S.Star>
            </S_privacy.PrivacyText>
          }
          labelPlacement="end"
        />
      </S_privacy.Wrapper>
      {/* 마케팅 정보 수신 동의 체크박스 */}
      <S_privacy.Wrapper>
        <FormControlLabel
          value="end"
          control={
            <S_privacy.PrivacyCheckbox
              name="marketing"
              onChange={check}
              checked={checkList.includes("marketing") ? true : false}
            />
          }
          label={
            <S_privacy.PrivacyText>마케팅 정보 수신 동의</S_privacy.PrivacyText>
          }
          labelPlacement="end"
        />
      </S_privacy.Wrapper>
    </Box>
  );
}
