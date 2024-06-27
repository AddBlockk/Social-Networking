import { IconButton, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

type MenuButtonProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

const MenuButton: React.FC<MenuButtonProps> = ({ anchorEl, setAnchorEl }) => {
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Tooltip title="Open Menu">
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}>
        <MenuIcon sx={{ color: "#aaaaaa", width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default MenuButton;
