import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from '@mui/material';
import { Science, Healing, Campaign, AccountTree } from '@mui/icons-material';
import './Footer.css';

function Footer({ onActionTabChange, activeActionTab }) {
  const handleTabChange = (event, newValue) => {
    onActionTabChange(newValue);
  };

  return (
    <>
      {/* This is the new mobile-only footer */}
      <Paper
        className="mobile-footer"
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={activeActionTab}
          onChange={handleTabChange}
        >
          <BottomNavigationAction label="投与" value="投与" icon={<Science />} />
          <BottomNavigationAction label="ケア" value="ケア" icon={<Healing />} />
          <BottomNavigationAction label="研究" value="研究" icon={<Campaign />} />
          {/* Hidden Skill Tree Button */}
          <BottomNavigationAction
            label="スキル"
            value="スキル"
            icon={<AccountTree />}
            className="skill-tree-button"
            style={{ display: 'none' }} // Inline style for initial hiding
          />
        </BottomNavigation>
      </Paper>

      {/* This is the original footer, now for desktop only */}
      <Box component="footer" className="app-footer desktop-footer">
        <p>&copy; 2024 Clinical Trial Sim. All rights reserved.</p>
      </Box>
    </>
  );
}

export default Footer;
