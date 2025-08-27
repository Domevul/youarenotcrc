import React from 'react';
import './GameScreen.css';
import EventModal from './EventModal.jsx';
import YuaCharacter from './YuaCharacter.jsx';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import {
  MonetizationOn,
  Biotech,
  Campaign,
  People,
  TrendingUp,
  Science,
  ThumbsUpDown,
  Healing,
} from '@mui/icons-material';

const StatCard = ({ icon, title, value, footer }) => (
  <Card variant="outlined">
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="p" sx={{ mb: 1 }}>
        {value}
      </Typography>
      {footer}
    </CardContent>
  </Card>
);

const ActionCard = ({ title, icon, description, children }) => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Grid container spacing={1} direction="column">
        {children}
      </Grid>
    </CardContent>
  </Card>
);

function GameScreen({
  gameState,
  onAction,
  currentEvent,
  onEventChoice,
  yuaHealth,
  yuaAffection,
}) {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const isActionDisabled = gameState.gameStatus !== 'ongoing';

  return (
    <Box className="game-screen" sx={{ p: 3 }}>
      <EventModal event={currentEvent} onChoice={onEventChoice} />

      {/* Status Display */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          研究サイクル: {gameState.turn} / 12
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {/* Yua's Status Area */}
          <Grid item xs={12} md={4}>
            <YuaCharacter health={yuaHealth} affection={yuaAffection} />
          </Grid>

          {/* Main Stats Area */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <StatCard
                  icon={<MonetizationOn color="success" />}
                  title="資産"
                  value={formatMoney(gameState.money)}
                />
              </Grid>
              <Grid item xs={6}>
                <StatCard
                  icon={<Biotech color="secondary" />}
                  title="データ収集率"
                  value={`${gameState.data} %`}
                  footer={
                    <LinearProgress
                      variant="determinate"
                      value={gameState.data}
                      color="secondary"
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Message Area */}
      {gameState.message && (
        <Alert severity={gameState.message.type} sx={{ mb: 2 }}>
          {gameState.message.text}
        </Alert>
      )}

      {/* Action Buttons */}
      <Box>
        <Typography variant="h5" gutterBottom>
          アクションを選択
        </Typography>
        <Grid container spacing={2}>
          {/* 投与 */}
          <Grid item xs={12} md={4}>
            <ActionCard
              title="投与"
              icon={<Science />}
              description="ユアにプロトタイプを投与し、データを収集します。Healthを消費しますが、最も効率的にデータを収集できます。"
            >
              <Button
                variant="contained"
                color="warning"
                startIcon={<Biotech />}
                onClick={() => onAction('ADMINISTER_STANDARD')}
                disabled={isActionDisabled}
              >
                標準プロトコル投与 ($30,000)
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Biotech />}
                onClick={() => onAction('ADMINISTER_HIGH_RISK')}
                disabled={isActionDisabled}
              >
                高リスク・高リターン投与 ($50,000)
              </Button>
            </ActionCard>
          </Grid>
          {/* ケア */}
          <Grid item xs={12} md={4}>
            <ActionCard
              title="ケア"
              icon={<Healing />}
              description="ユアとの関係を築き、心身の状態を安定させます。HealthやAffectionの維持に不可欠です。"
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<People />}
                onClick={() => onAction('TALK_TO_YUA')}
                disabled={isActionDisabled}
              >
                ユアと会話する ($0)
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<Healing />}
                onClick={() => onAction('PROVIDE_PALLIATIVE_CARE')}
                disabled={isActionDisabled}
              >
                緩和ケアを行う ($40,000)
              </Button>
            </ActionCard>
          </Grid>
          {/* 研究 */}
          <Grid item xs={12} md={4}>
            <ActionCard
              title="研究"
              icon={<Campaign />}
              description="直接的なデータ収集ではなく、投与の効率を高めたり、リスクを低減させたりするための補助的な活動です。"
            >
              <Button
                variant="outlined"
                startIcon={<TrendingUp />}
                onClick={() => onAction('BASIC_RESEARCH')}
                disabled={isActionDisabled}
              >
                基礎研究 ($20,000)
              </Button>
              <Button
                variant="outlined"
                startIcon={<ThumbsUpDown />}
                onClick={() => onAction('ANALYZE_SIDE_EFFECTS')}
                disabled={isActionDisabled}
              >
                副作用の分析 ($60,000)
              </Button>
            </ActionCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default GameScreen;
