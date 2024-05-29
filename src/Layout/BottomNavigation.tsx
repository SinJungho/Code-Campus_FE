import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArchiveIcon from "@mui/icons-material/Archive";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <ThemeProvider theme={theme}>
        <BottomNavigation
          showLabels
          sx={{
            height: isMobile ? "5rem" : "5rem",
            gap: isMobile ? "1rem" : "1rem",
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Recents"
            icon={<RestoreIcon sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={
              <FavoriteIcon sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />
            }
          />
          <BottomNavigationAction
            label="Archive"
            icon={<ArchiveIcon sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />}
          />
        </BottomNavigation>
      </ThemeProvider>
    </Paper>
  );
}
