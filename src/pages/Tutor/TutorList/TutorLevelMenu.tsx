import React, { useState } from "react";
import { Box, Button } from "@mui/material";


type LevelType = {
  handleLevelChange: (level: string) => void;
};

const levels = [
  {
    id: 1,
    label: "입문",
    backgroundColor: "#E9FBEC",
    borderColor: "#158B28",
    color: "#158B28",
  },
  {
    id: 2,
    label: "초급",
    backgroundColor: "#FFF1CE",
    borderColor: "#C3951C",
    color: "#C3951C",
  },
  {
    id: 3,
    label: "중급 이상",
    backgroundColor: "#FFEAEA",
    borderColor: "#FD5555",
    color: "#FD5555",
  },
];

export default function TutorLevelMenu({ handleLevelChange }: LevelType) {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const handleButtonClick = (level: string) => {
    setActiveButtons((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
    handleLevelChange(level);
  };

  return (
    <Box sx={{ display: "flex", gap: "15px", marginTop: "1rem" }}>
      {levels.map((level) => (
        <Button
          key={level.id}
          onClick={() => handleButtonClick(level.label)}
          sx={{
            backgroundColor: level.backgroundColor,
            border: `2px solid ${level.borderColor}`,
            color: level.color,
            borderRadius: "30px",
            padding: "5px 25px",
            "&:hover": { backgroundColor: level.backgroundColor, opacity: 0.8 },
            ...(activeButtons.includes(level.label) && {
              backgroundColor: level.borderColor,
              color: "white",
              "&:hover": { backgroundColor: level.borderColor, opacity: 0.8 },
            }),
          }}
        >
          {level.label}
        </Button>
      ))}
    </Box>
  );
}
