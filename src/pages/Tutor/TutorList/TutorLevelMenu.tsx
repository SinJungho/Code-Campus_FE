import { Box, Button } from "@mui/material";
import { Filters } from "../../../type/TutorListType";
import React from "react";

type LevelType = {
  handleLevelChange: Function;
};

const data = [{ id: 1, backgroundColor: "", borderColor: "", param: "입문" }];

export default function TutorLevelMenu({ handleLevelChange }: LevelType) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "0.6rem" }}>
      <Button
        variant="contained"
        onClick={() => handleLevelChange("입문")}
        sx={{
          backgroundColor: "#E9FBEC",
          border: "2px solid #158B28",
          color: "#158B28",
          borderRadius: "30px",
          marginRight: "15px",
          padding: "5px 25px",
          "&:hover": { backgroundColor: "#c7dccb" },
        }}
      >
        입문
      </Button>
      <Button
        variant="contained"
        onClick={() => handleLevelChange("초급")}
        sx={{
          backgroundColor: "#FFF1CE",
          border: "2px solid #C3951C",
          color: "#C3951C",
          borderRadius: "30px",
          marginRight: "15px",
          padding: "5px 25px",
          "&:hover": { backgroundColor: "#EDE1C2" },
        }}
      >
        초급
      </Button>
      <Button
        variant="contained"
        onClick={() => handleLevelChange("중급 이상")}
        sx={{
          backgroundColor: "#FFEAEA",
          border: "2px solid #FD5555",
          color: "#FD5555",
          borderRadius: "30px",
          marginRight: "15px",
          padding: "5px 25px",
          "&:hover": { backgroundColor: "#ECD9D9" },
        }}
      >
        중급 이상
      </Button>
    </Box>
  );
}
