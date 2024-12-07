import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LiveMatchesScreen } from '../screens/LiveMatchesScreen';
import { FavoriteCommentatorsScreen } from '../screens/FavoriteCommentatorsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          borderTopColor: isDarkMode ? '#333333' : '#e0e0e0',
        },
        tabBarActiveTintColor: '#1E88E5',
        tabBarInactiveTintColor: isDarkMode ? '#888888' : '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Cairo',
        },
      }}
    >
      <Tab.Screen
        name="LiveMatches"
        component={LiveMatchesScreen}
        options={{
          title: 'المباريات',
          tabBarIcon: ({ color, size }) => (
            <Icon name="soccer" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'المباريات المباشرة',
        }}
      />

      <Tab.Screen
        name="FavoriteCommentators"
        component={FavoriteCommentatorsScreen}
        options={{
          title: 'المفضلة',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'المعلقون المفضلون',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'حسابي',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'الملف الشخصي',
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'الإعدادات',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'الإعدادات',
        }}
      />
    </Tab.Navigator>
  );
};
