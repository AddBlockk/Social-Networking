import React from "react";
import { Box, ListItemIcon, Menu, MenuItem, Switch } from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Logout, Settings } from "@mui/icons-material";

type MenuItemsProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  isNightMode: boolean;
  toggleTheme: () => void;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuItems: React.FC<MenuItemsProps> = ({
  anchorEl,
  setAnchorEl,
  isNightMode,
  toggleTheme,
  setIsSettingsOpen,
}) => {
  const open = Boolean(anchorEl);

  const handleSwitchClick = (event: React.MouseEvent<HTMLLIElement>) => {
    toggleTheme();
    event.stopPropagation();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOut = () => {
    signOut(auth);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      sx={{
        "& .MuiMenu-paper": {
          backgroundColor: isNightMode ? "#303030" : "white",
          color: isNightMode ? "white" : "black",
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 10,
            width: 10,
            height: 10,
            backgroundColor: "windowMenuMarkLight",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <MenuItem onClick={handleSwitchClick}>
        <ListItemIcon>
          <ContrastIcon
            fontSize="small"
            sx={{
              color: isNightMode ? "white" : "#707579",
            }}
          />
        </ListItemIcon>
        Night Mode
        <Box sx={{ flexGrow: 1 }} />
        <Switch checked={isNightMode} />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          setIsSettingsOpen(true);
        }}>
        <ListItemIcon>
          <Settings
            fontSize="small"
            sx={{
              color: isNightMode ? "white" : "#707579",
            }}
          />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleOut}>
        <ListItemIcon>
          <Logout
            fontSize="small"
            sx={{
              color: isNightMode ? "white" : "#707579",
            }}
          />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default MenuItems;
