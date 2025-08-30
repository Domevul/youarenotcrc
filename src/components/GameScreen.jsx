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

import { Paper } from '@mui/material';

const MobileActionPanel = ({ activeTab, onAction, isActionDisabled }) => {
  if (!activeTab) return null;

  const renderActions = () => {
    switch (activeTab) {
      case '投与':
        return (
          <>
            <Button
              variant="contained"
              color="warning"
              startIcon={<Biotech />}
              onClick={() => onAction('ADMINISTER_STANDARD')}
              disabled={isActionDisabled}
              fullWidth
            >
              標準プロトコル投与 ($30,000)
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Biotech />}
              onClick={() => onAction('ADMINISTER_HIGH_RISK')}
              disabled={isActionDisabled}
              fullWidth
            >
              高リスク・高リターン投与 ($50,000)
            </Button>
          </>
        );
      case 'ケア':
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<People />}
              onClick={() => onAction('TALK_TO_YUA')}
              disabled={isActionDisabled}
              fullWidth
            >
              ユアと会話する ($0)
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<Healing />}
              onClick={() => onAction('PROVIDE_PALLIATIVE_CARE')}
              disabled={isActionDisabled}
              fullWidth
            >
              緩和ケアを行う ($40,000)
            </Button>
          </>
        );
      case '研究':
        return (
          <>
            <Button
              variant="outlined"
              startIcon={<TrendingUp />}
              onClick={() => onAction('BASIC_RESEARCH')}
              disabled={isActionDisabled}
              fullWidth
            >
              基礎研究 ($20,000)
            </Button>
            <Button
              variant="outlined"
              startIcon={<ThumbsUpDown />}
              onClick={() => onAction('ANALYZE_SIDE_EFFECTS')}
              disabled={isActionDisabled}
              fullWidth
            >
              副作用の分析 ($60,000)
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Paper
      className="mobile-action-panel"
      elevation={4}
      sx={{
        p: 2,
        position: 'fixed',
        bottom: '56px', // Standard height of BottomNavigation
        left: 0,
        right: 0,
        zIndex: 999, // Below footer but above content
      }}
    >
      <Grid container spacing={1} direction="column">
        {renderActions()}
      </Grid>
    </Paper>
  );
};

function GameScreen({
  gameState,
  onAction,
  currentEvent,
  onEventChoice,
  yuaHealth,
  yuaAffection,
  activeActionTab,
  initialMoney,
}) {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const isActionDisabled = gameState.gameStatus !== 'ongoing';

  const moneyPercent = (gameState.money / initialMoney) * 100;
  const getMoneyBarColor = (percent) => {
    if (percent > 50) return 'success';
    if (percent > 20) return 'warning';
    return 'error';
  };

  return (
    <Box className="game-screen" sx={{ p: 3 }}>
      <EventModal event={currentEvent} onChoice={onEventChoice} />

      {/* Status Display */}
      <Box sx={{ mb: 3 }}>
        {/* Message Area */}
        {gameState.message && (
          <Alert severity={gameState.message.type} sx={{ mb: 2 }}>
            {gameState.message.text}
          </Alert>
        )}
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
                  footer={
                    <LinearProgress
                      variant="determinate"
                      value={moneyPercent}
                      color={getMoneyBarColor(moneyPercent)}
                    />
                  }
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

      {/* Action Buttons */}
      <Box className="action-cards-container">
        <Typography variant="h5" gutterBottom>
          アクションを選択
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {/* 投与 */}
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
          {/* ケア */}
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
          {/* 研究 */}
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
        </Box>
      </Box>

      {/* Mobile Action Panel */}
      <MobileActionPanel
        activeTab={activeActionTab}
        onAction={onAction}
        isActionDisabled={isActionDisabled}
      />
    </Box>
  );
}

export default GameScreen;
