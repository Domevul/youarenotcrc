import React from 'react';
import './EventModal.css';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Person } from '@mui/icons-material';

function EventModal({ event, onChoice }) {
  if (!event) {
    return null;
  }

  // 改行文字を<br />タグに変換
  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="modal-overlay">
      <Card className="modal-content" elevation={12}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
              <Person />
            </Avatar>
            <Typography variant="h5" component="div">
              {event.title}
            </Typography>
          </Box>
          {event.character && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2, fontStyle: 'italic' }}
            >
              {event.character}
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body1"
            component="div"
            className="event-description"
          >
            {formatDescription(event.description)}
          </Typography>
          <Box className="modal-choices" sx={{ mt: 3 }}>
            {event.choices.map((choice) => (
              <Button
                key={choice.id}
                variant="contained"
                onClick={() => onChoice(choice)}
                fullWidth
                sx={{ mb: 1.5, textAlign: 'left' }}
              >
                <Box>
                  <Typography variant="button">{choice.text}</Typography>
                  <Typography variant="caption" display="block">
                    {choice.description}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventModal;
