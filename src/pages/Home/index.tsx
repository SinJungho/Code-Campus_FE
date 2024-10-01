import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "@mui/icons-material";
import { Avatar, Button, IconButton, InputBase, Paper } from "@mui/material";
import students from "../../mock-data/students";

const list: number[] = [1, 2, 3];

const Home: React.FC = () => {
  const [popularTutors, setPopularTutors] = useState<Tutor[]>([]);
  const [newTutors, setNewTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const response = await axios.post(
        "http://localhost:8080/api/users/refreshToken",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // 로그아웃 처리 또는 사용자에게 다시 로그인 요청
    }
  };

  const fetchTutors = async (orderCondition: "POP" | "NEW") => {
    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        token = await refreshToken(); // 토큰 갱신
      }
      const response = await axios.post(
        "http://localhost:8080/api/tutor/find",
        { orderCondition },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.result && response.status === 200) {
        if (orderCondition === "POP") {
          setPopularTutors(response.data.data);
        } else if (orderCondition === "NEW") {
          setNewTutors(response.data.data);
        }
      } else {
        console.error("Failed to fetch tutors:", response);
      }
    } catch (error) {
      const axiosError = error as AxiosError; // error를 AxiosError로 캐스팅
      if (axiosError.response && axiosError.response.status === 403) {
        console.error(
          "Authorization error: Please check if the token is valid"
        );
      } else {
        console.error("Error fetching data:", axiosError);
      }
    }
  };

  useEffect(() => {
    const checkAndFetchTutors = async () => {
      setLoading(true);
      await fetchTutors("POP");
      await fetchTutors("NEW");
      setLoading(false);
    };

    checkAndFetchTutors();
  }, []);

  return (
    <S.Wrapper>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 인기 선배 섹션 */}
          <S.CardDiv>
            <h1>인기 선배님</h1>
            {popularTutors.length > 0 ? (
              popularTutors.map((tutor, index) => (
                <S.CardWrap
                  key={index}
                  sx={{
                    mt: "2rem",
                    padding: "1.5rem",
                    bgcolor: "#f5f5f5",
                    borderRadius: ".8rem",
                    boxShadow: "none",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      fontSize: "1rem",
                      color: "#999",
                      bgcolor: "#fff",
                      display: "flex",
                      alignContent: "center",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      mr: "1.5rem",
                    }}
                    src={tutor.tutorProfileImg}
                  >
                    {tutor.userName.charAt(0)}
                  </Avatar>
                  <S.CardTextDiv>
                    <div>
                      {tutor.keyword.map((value, idx) => (
                        <span key={idx}>#{value} </span>
                      ))}
                    </div>
                    <p>{tutor.school + " " + tutor.classArea}</p>
                    <b>{tutor.userName} 선배님</b>
                  </S.CardTextDiv>
                  <Link to={`/TutorDetail/${tutor.userNo}`}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 5,
                        padding: ".2rem 1rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      상세보기
                    </Button>
                  </Link>
                </S.CardWrap>
              ))
            ) : (
              <p>No popular tutors available</p>
            )}
          </S.CardDiv>

          {/* 최신 선배 섹션 */}
          <S.CardDiv>
            <h1>최신 선배님</h1>
            {newTutors.length > 0 ? (
              newTutors.map((tutor, index) => (
                <S.CardWrap
                  key={index}
                  sx={{
                    mt: "2rem",
                    padding: "1.5rem",
                    bgcolor: "#e0e0e0",
                    borderRadius: ".8rem",
                    boxShadow: "none",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      fontSize: "1rem",
                      color: "#999",
                      bgcolor: "#fff",
                      display: "flex",
                      alignContent: "center",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      mr: "1.5rem",
                    }}
                    src={tutor.tutorProfileImg}
                  >
                    {tutor.userName.charAt(0)}
                  </Avatar>
                  <S.CardTextDiv>
                    <div>
                      {tutor.keyword.map((value, idx) => (
                        <span key={idx}>#{value} </span>
                      ))}
                    </div>
                    <p>{tutor.school + " " + tutor.classArea}</p>
                    <b>{tutor.userName} 선배님</b>
                  </S.CardTextDiv>
                  <Link to={`/TutorDetail/${tutor.userNo}`}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 5,
                        padding: ".2rem 1rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      상세보기
                    </Button>
                  </Link>
                </S.CardWrap>
              ))
            ) : (
              <p>No new tutors available</p>
            )}
          </S.CardDiv>
        </>
      )}
    </S.Wrapper>
  );
};

export default Home;
