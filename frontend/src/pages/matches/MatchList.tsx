import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  useTheme,
  Tab,
  Tabs,
} from '@mui/material';
import {
  VolumeUp,
  Favorite,
  Share,
  LiveTv,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ScreenReader from '../../components/accessibility/ScreenReader';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`matches-tabpanel-${index}`}
      aria-labelledby={`matches-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const MatchList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const matches = [
    {
      id: 1,
      homeTeam: 'الرجاء',
      awayTeam: 'الوداد',
      date: '2024-01-20',
      time: '20:00',
      status: 'live',
      venue: 'ملعب محمد الخامس',
      commentators: 3,
      listeners: 120,
    },
    {
      id: 2,
      homeTeam: 'المغرب التطواني',
      awayTeam: 'اتحاد طنجة',
      date: '2024-01-21',
      time: '18:00',
      status: 'upcoming',
      venue: 'ملعب سانية الرمل',
      commentators: 2,
      listeners: 0,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        المباريات
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="نوع المباريات"
          centered
        >
          <Tab label="المباريات المباشرة" id="matches-tab-0" />
          <Tab label="المباريات القادمة" id="matches-tab-1" />
          <Tab label="الأرشيف" id="matches-tab-2" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {matches
            .filter((match) => match.status === 'live')
            .map((match) => (
              <Grid item xs={12} md={6} key={match.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip
                        icon={<LiveTv />}
                        label="مباشر"
                        color="error"
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {match.time}
                      </Typography>
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {match.homeTeam} vs {match.awayTeam}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {match.venue}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        icon={<VolumeUp />}
                        label={`${match.commentators} معلقين`}
                        size="small"
                      />
                      <Chip
                        icon={<Favorite />}
                        label={`${match.listeners} مستمع`}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/matches/${match.id}`)}
                    >
                      استمع للتعليق
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <ScreenReader
        message={`المباريات ${
          tabValue === 0
            ? 'المباشرة'
            : tabValue === 1
            ? 'القادمة'
            : 'السابقة'
        }. استخدم مفاتيح التنقل للتنقل بين المباريات.`}
      />
    </Container>
  );
};

export default MatchList;
