import * as React from "react";
import { useAuthStore, useUserStore } from "../stores/isLogined/loginStore";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import header_logo from "../assets/img/header_logo.png";
import { Link } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import TemporaryDrawer from "./Drawer";

export default function MenuAppBar() {
  const { isLoggedIn, isLoading, setIsLoggedIn, setIsLoading } = useAuthStore();
  const { userName, userEmail, setUserName, setUserEmail } = useUserStore();
  const [auth, setAuth] = React.useState(isLoggedIn);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          padding: "1.5rem",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <TemporaryDrawer />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, minHeight: "3rem" }}
          >
            <Link to="/">
              <img
                src={header_logo}
                alt="header_logo"
                style={{ width: "10rem" }}
              />
            </Link>
          </IconButton>
          <Box
            sx={{ minWidth: "4.5rem", display: "flex", justifyContent: "end" }}
          >
            {localStorage.getItem('isLoggedIn') === 'true' ? (
              <Link to="/profile">
                <Paper>
                  {userName} 님
                </Paper>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    padding: ".2rem 1rem",
                    fontSize: "0.75rem",
                  }}
                >
                  로그인
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
