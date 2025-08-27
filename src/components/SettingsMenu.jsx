import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import './SettingsMenu.css';

function SettingsMenu({ onRestart, onReturnToTitle, onSave }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    handleClose();
    action();
  };

  return (
    <div className="settings-menu-container">
      <IconButton
        aria-label="settings"
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
      >
        <MenuItem onClick={() => handleMenuClick(onRestart)}>
          フェーズ1のやり直し
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick(onReturnToTitle)}>
          タイトル画面に戻る
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick(onSave)}>セーブする</MenuItem>
      </Menu>
    </div>
  );
}

export default SettingsMenu;
