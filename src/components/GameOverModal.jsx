import React from 'react';
import './GameOverModal.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';

function GameOverModal({ gameStatus, onRestart, onReturnToTitle }) {
  if (gameStatus !== 'won' && gameStatus !== 'lost') {
    return null;
  }

  const isWon = gameStatus === 'won';
  const title = isWon ? 'フェーズ1成功！' : 'ゲームオーバー';
  const message = isWon
    ? 'おめでとうございます！臨床試験のフェーズ1は成功裏に完了しました。'
    : '残念ながら、プロジェクトは失敗に終わりました。';

  return (
    <div className="modal-overlay">
      <Card className="modal-content" elevation={12}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ mb: 2, textAlign: 'center' }}
          >
            {title}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" component="div" sx={{ mb: 3 }}>
            {message}
          </Typography>
          <Box
            className="modal-choices"
            sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={onRestart}
              fullWidth
            >
              フェーズやり直し
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onReturnToTitle}
              fullWidth
            >
              タイトルへ戻る
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default GameOverModal;
