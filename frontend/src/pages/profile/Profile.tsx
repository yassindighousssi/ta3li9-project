import {
  import React from 'react';
  Box,
  Container,
      Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Person,
  Settings,
  Notifications,
  VolumeUp,
  History,
  Favorite,
} from '@mui/icons-material';
import ScreenReader from '../../components/accessibility/ScreenReader';
import useAuth from '../../hooks/useAuth';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data - replace with API calls
  const recentActivity = [
    {
      id: 1,
      type: 'comment',
      match: 'الرجاء vs الوداد',
      time: 'منذ ساعة',
      content: 'تعليق رائع على المباراة!',
    },
    {
      id: 2,
      type: 'listen',
      match: 'المغرب التطواني vs اتحاد طنجة',
      time: 'منذ يومين',
      content: 'استمع إلى التعليق المباشر',
    },
  ];

  const preferences = {
    screenReader: true,
    highContrast: false,
    autoPlay: true,
    notifications: true,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            >
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.fullName || 'المستخدم'}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {user?.email || 'example@email.com'}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Settings />}
              fullWidth
              onClick={() => setTabValue(2)}
            >
              تعديل الملف الشخصي
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
              >
                <Tab
                  icon={<History />}
                  label="النشاط الأخير"
                  id="profile-tab-0"
                />
                <Tab
                  icon={<Favorite />}
                  label="المفضلة"
                  id="profile-tab-1"
                />
                <Tab
                  icon={<Settings />}
                  label="الإعدادات"
                  id="profile-tab-2"
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <List>
                {recentActivity.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          {activity.type === 'comment' ? (
                            <Person />
                          ) : (
                            <VolumeUp />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.match}
                        secondary={`${activity.content} • ${activity.time}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1" color="text.secondary">
                لا توجد مباريات في المفضلة
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                إعدادات إمكانية الوصول
              </Typography>
              <List>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.screenReader}
                        onChange={() => {}}
                      />
                    }
                    label="تفعيل قارئ الشاشة"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.highContrast}
                        onChange={() => {}}
                      />
                    }
                    label="وضع التباين العالي"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.autoPlay}
                        onChange={() => {}}
                      />
                    }
                    label="تشغيل التعليق تلقائياً"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.notifications}
                        onChange={() => {}}
                      />
                    }
                    label="تفعيل الإشعارات"
                  />
                </ListItem>
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <ScreenReader
        message={`الملف الشخصي ل${user?.fullName || 'المستخدم'}. ${
          tabValue === 0
            ? 'عرض النشاط الأخير'
            : tabValue === 1
            ? 'عرض المفضلة'
            : 'عرض الإعدادات'
        }`}
      />
    </Container>
  );
};

export default Profile;
