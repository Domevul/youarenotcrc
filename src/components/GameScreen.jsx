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
  Group,
  Biotech,
  Campaign,
  People,
  TrendingUp,
  HourglassEmpty,
  Science,
  ThumbsUpDown,
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
  currentChapter,
}) {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const isActionDisabled = gameState.gameStatus !== 'ongoing';

  const getGameStatusAlert = () => {
    if (gameState.gameStatus === 'lost' || gameState.gameStatus === 'won') {
      return (
        <Alert
          severity={gameState.gameStatus === 'won' ? 'success' : 'error'}
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">
            {gameState.gameStatus === 'won'
              ? 'フェーズ1成功！'
              : 'ゲームオーバー'}
          </Typography>
          {gameState.currentMessage}
        </Alert>
      );
    }
    return null;
  };

  return (
    <Box className="game-screen" sx={{ p: 3 }}>
      <EventModal event={currentEvent} onChoice={onEventChoice} />

      {getGameStatusAlert()}

      {/* Chapter Goal Display */}
      {currentChapter && gameState.gameStatus === 'ongoing' && (
        <Card sx={{ mb: 3, backgroundColor: 'primary.light' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {currentChapter.title}
            </Typography>
            <Typography variant="body1">{currentChapter.goalText}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Status Display */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          現在の状況 (ターン: {gameState.turn} / 10)
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {/* Main Stats Area */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StatCard
                  icon={<MonetizationOn color="success" />}
                  title="資産"
                  value={formatMoney(gameState.money)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StatCard
                  icon={<ThumbsUpDown color="info" />}
                  title="評判"
                  value={`${gameState.reputation} / 100`}
                  footer={
                    <LinearProgress
                      variant="determinate"
                      value={gameState.reputation}
                      color="info"
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StatCard
                  icon={<Group color="primary" />}
                  title="参加者"
                  value={`${gameState.participants} 人`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
          {/* Yua's Status Area */}
          <Grid item xs={12} md={4}>
            <YuaCharacter
              health={gameState.yuaHealth}
              affection={gameState.yuaAffection}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Message Area */}
      {gameState.gameStatus === 'ongoing' && (
        <Alert severity="info" sx={{ mb: 4 }}>
          {gameState.currentMessage}
        </Alert>
      )}

      {/* Action Buttons */}
      <Box>
        <Typography variant="h4" gutterBottom>
          アクションを選択
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              title="広報"
              icon={<Campaign />}
              description="治験への参加者を募集し、プロジェクトの認知度を高めます。参加者が増えるほど、データ収集の母数が増えます。"
            >
              <Button
                variant="contained"
                startIcon={<TrendingUp />}
                onClick={() => onAction('STANDARD_PR')}
                disabled={isActionDisabled}
              >
                標準的な広報活動 ($10,000)
              </Button>
              <Button
                variant="contained"
                startIcon={<TrendingUp />}
                onClick={() => onAction('LARGE_SCALE_PR')}
                disabled={isActionDisabled}
              >
                大規模な広報キャンペーン ($50,000)
              </Button>
            </ActionCard>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              title="研究"
              icon={<Science />}
              description="集まった参加者からデータを収集・解析し、治験の進捗率を高めます。これがプロジェクトの主目的です。"
            >
              <Button
                variant="contained"
                startIcon={<Biotech />}
                onClick={() => onAction('NORMAL_DATA_COLLECTION')}
                disabled={isActionDisabled}
              >
                通常のデータ収集 ($20,000)
              </Button>
              <Button
                variant="contained"
                startIcon={<Biotech />}
                onClick={() => onAction('ADVANCED_DATA_ANALYSIS')}
                disabled={isActionDisabled}
              >
                高度なデータ解析 ($80,000)
              </Button>
            </ActionCard>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              title="チーム"
              icon={<People />}
              description="研究チームの環境を整え、士気を高めます。チームの状態は、研究の効率に影響を与えます。"
            >
              <Button
                variant="contained"
                startIcon={<HourglassEmpty />}
                onClick={() => onAction('MAINTAIN_STATUS_QUO')}
                disabled={isActionDisabled}
              >
                現状維持 ($0)
              </Button>
              <Button
                variant="contained"
                startIcon={<People />}
                onClick={() => onAction('INVEST_IN_TEAM')}
                disabled={isActionDisabled}
              >
                チームへの投資 ($30,000)
              </Button>
            </ActionCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default GameScreen;
