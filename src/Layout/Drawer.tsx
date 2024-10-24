import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useMyProfileStore } from "../stores/Tutor/useDetailStore";

interface MenuType {
  name: string;
  url: string;
}

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { userType } = useMyProfileStore();
  const MenuList: MenuType[] = [
    { name: "코드캠퍼스 소개", url: "/about" },
    { name: "선배 탐색", url: "/tutorList" },
    {
      name: "내 프로필",
      // url: "/profile",
      url: userType === "BASIC" ? "/profileTutee" : "/profile",
    },
  ];
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {MenuList.map((value, index) => (
          <Link to={value.url} key={index}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  padding: "1rem",
                  color: "#333",
                }}
              >
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minWidth: "4.5rem", display: "flex", justifyContent: "start" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
