import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
} from '@mui/material';
import {
  VolumeUp,
  Favorite,
  FavoriteBorder,
  Share,
  Comment,
  Person,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import ScreenReader from '../../components/accessibility/ScreenReader';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isListening, setIsListening] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Mock data - replace with API call
  const match = {
    id: 1,
    homeTeam: 'الرجاء',
    awayTeam: 'الوداد',
    score: '2 - 1',
    date: '2024-01-20',
    time: '20:00',
    venue: 'ملعب محمد الخامس',
    status: 'live',
    commentators: [
      {
        id: 1,
        name: 'أحمد محمد',
        avatar: '',
        rating: 4.5,
        listeners: 75,
      },
      {
        id: 2,
        name: 'عمر خالد',
        avatar: '',
        rating: 4.8,
        listeners: 45,
      },
    ],
    recentComments: [
      {
        id: 1,
        user: 'محمد علي',
        text: 'هجمة خطيرة من الرجاء!',
        time: '89:00',
      },
      {
        id: 2,
        user: 'سعيد أحمد',
        text: 'تصدي رائع من الحارس',
        time: '87:30',
      },
    ],
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {match.homeTeam} vs {match.awayTeam}
          </Typography>
          <Typography variant="h2" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            {match.score}
          </Typography>
          <Chip
            label="مباشر"
            color="error"
            icon={<VolumeUp />}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" color="text.secondary">
            {match.venue} • {match.time}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                المعلقون المباشرون
              </Typography>
              <List>
                {match.commentators.map((commentator) => (
                  <React.Fragment key={commentator.id}>
                    <ListItem
                      secondaryAction={
                        <Button
                          variant={isListening ? 'contained' : 'outlined'}
                          startIcon={<VolumeUp />}
                          onClick={toggleListening}
                        >
                          {isListening ? 'إيقاف الاستماع' : 'استمع'}
                        </Button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={commentator.name}
                        secondary={`${commentator.listeners} مستمع • تقييم ${commentator.rating}/5`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                آخر التعليقات
              </Typography>
              <List>
                {match.recentComments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.text}
                        secondary={`${comment.user} • ${comment.time}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                التفاعل
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <IconButton
                  aria-label="أضف إلى المفضلة"
                  onClick={() => setIsFavorite(!isFavorite)}
                  color={isFavorite ? 'error' : 'default'}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton aria-label="مشاركة">
                  <Share />
                </IconButton>
                <IconButton aria-label="تعليق">
                  <Comment />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <ScreenReader
        message={`مباراة ${match.homeTeam} ضد ${match.awayTeam}. النتيجة الحالية ${match.score}. ${match.commentators.length} معلقين متاحين للاستماع.`}
      />
    </Container>
  );
};

export default MatchDetails;
