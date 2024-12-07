import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Home,
  SportsFootball,
  Comment,
  Person,
  Settings,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, drawerWidth }) => {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { text: 'الرئيسية', icon: <Home />, path: '/', shortcut: 'Alt + 1' },
    { text: 'المباريات', icon: <SportsFootball />, path: '/matches', shortcut: 'Alt + 2' },
    { text: 'التعليقات', icon: <Comment />, path: '/comments', shortcut: 'Alt + 3' },
    { text: 'الملف الشخصي', icon: <Person />, path: '/profile', shortcut: 'Alt + 4' },
    { text: 'الإعدادات', icon: <Settings />, path: '/settings', shortcut: 'Alt + 5' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: isOpen ? drawerWidth : theme.spacing(7),
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : theme.spacing(7),
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box sx={{ height: theme.spacing(8) }} /> {/* Toolbar spacing */}
      <List component="nav" aria-label="القائمة الرئيسية">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              minHeight: 48,
              px: 2.5,
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
              },
            }}
            aria-label={`${item.text} - اختصار لوحة المفاتيح ${item.shortcut}`}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ opacity: isOpen ? 1 : 0 }}
              secondary={item.shortcut}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
