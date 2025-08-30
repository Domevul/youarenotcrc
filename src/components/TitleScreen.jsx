import React from 'react';
import './TitleScreen.css';
import { Box, Button, Typography, Container } from '@mui/material';

function TitleScreen({ onStartGame }) {
  return (
    <Container
      component="main"
      maxWidth="md"
      className="title-screen-container"
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}yua-neutral.svg`}
          alt="Character"
          className="title-screen-character"
        />
        <Typography component="h1" variant="h2" gutterBottom className="title-screen-title">
          Cure Human
        </Typography>
        <Typography variant="h5" gutterBottom className="title-screen-subtitle">
          A Clinical Trial Adventure
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2, py: 1.5 }}
            onClick={onStartGame}
          >
            はじめる
          </Button>
          <Button fullWidth variant="outlined" sx={{ mb: 2, py: 1.5 }} disabled>
            ロード
          </Button>
          <Button fullWidth variant="outlined" sx={{ py: 1.5 }} disabled>
            設定
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TitleScreen;
