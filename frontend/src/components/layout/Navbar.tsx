import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  VolumeUp,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, toggleTheme, isDarkMode }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
      role="banner"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="افتح القائمة الجانبية"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
          }}
          aria-label="الصفحة الرئيسية"
        >
          تعليق
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="إعدادات الصوت"
            component={Link}
            to="/audio-settings"
          >
            <VolumeUp />
          </IconButton>

          <Button
            color="inherit"
            component={Link}
            to="/login"
            aria-label="تسجيل الدخول"
          >
            تسجيل الدخول
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
