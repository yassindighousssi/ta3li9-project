import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  useTheme,
  import { SportsFootball, LiveTv, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ScreenReader from '../components/accessibility/ScreenReader';
} from '@mui/material';

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'المباريات المباشرة',
      description: 'تابع المباريات الحية مع تعليقات صوتية مباشرة',
      icon: <LiveTv fontSize="large" />,
      path: '/matches/live',
      color: theme.palette.error.main,
    },
    {
      title: 'المباريات القادمة',
      description: 'تعرف على جدول المباريات القادمة',
      icon: <SportsFootball fontSize="large" />,
      path: '/matches/upcoming',
      color: theme.palette.primary.main,
    },
    {
      title: 'أرشيف المباريات',
      description: 'استمع إلى تعليقات المباريات السابقة',
      icon: <History fontSize="large" />,
      path: '/matches/archive',
      color: theme.palette.success.main,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          مرحباً بك في تعليق
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          منصة التعليق الرياضي الأولى المخصصة لذوي الإعاقة البصرية
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(feature.path)}
                sx={{ height: '100%' }}
                aria-label={`${feature.title} - ${feature.description}`}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: feature.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          المباريات المباشرة الآن
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip
            label="الرجاء vs الوداد"
            color="error"
            icon={<LiveTv />}
            onClick={() => navigate('/matches/live/1')}
          />
          <Chip
            label="المغرب التطواني vs اتحاد طنجة"
            color="error"
            icon={<LiveTv />}
            onClick={() => navigate('/matches/live/2')}
          />
        </Box>
      </Box>

      <ScreenReader
        message="مرحباً بك في تعليق، منصة التعليق الرياضي المخصصة لذوي الإعاقة البصرية. استخدم مفاتيح التنقل للوصول إلى المباريات المباشرة والقادمة والأرشيف."
      />
    </Container>
  );
};

export default Home;
