import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AccessibleButton } from '../components/AccessibleButton';
import { Logo } from '../components/Logo';

interface UserProfile {
  name: string;
  avatar: string;
  role: 'commentator' | 'listener' | 'blind';
  matchesCount: number;
  favoriteTeams: string[];
  favoriteCommentators: number;
  stats?: {
    followers: number;
    likes: number;
  };
}

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    // هنا سيتم جلب بيانات الملف الشخصي من API
  };

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      {profile?.role === 'commentator' ? (
        <AccessibleButton
          label="بدء التعليق"
          onPress={() => {/* التنقل إلى شاشة التعليق */}}
          style={styles.actionButton}
          accessibilityHint="ابدأ جلسة تعليق جديدة"
        />
      ) : (
        <AccessibleButton
          label="استمع الآن"
          onPress={() => {/* التنقل إلى المباريات المباشرة */}}
          style={styles.actionButton}
          accessibilityHint="استمع إلى المباريات المباشرة"
        />
      )}
    </View>
  );

  if (!profile) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" />
        <Image
          source={{ uri: profile.avatar }}
          style={styles.avatar}
          accessible={true}
          accessibilityLabel="صورة الملف الشخصي"
        />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>
          {profile.role === 'commentator' ? 'معلق' : 
           profile.role === 'blind' ? 'مستمع (كفيف)' : 'مستمع'}
        </Text>
      </View>

      {renderQuickActions()}

      <View style={styles.stats}>
        {profile.role === 'commentator' && profile.stats && (
          <>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.stats.followers}</Text>
              <Text style={styles.statLabel}>المتابعون</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.stats.likes}</Text>
              <Text style={styles.statLabel}>الإعجابات</Text>
            </View>
          </>
        )}
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.matchesCount}</Text>
          <Text style={styles.statLabel}>المباريات</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.favoriteCommentators}</Text>
          <Text style={styles.statLabel}>المفضلة</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الفرق المفضلة</Text>
        <View style={styles.teamsList}>
          {profile.favoriteTeams.map((team, index) => (
            <Text key={index} style={styles.teamItem}>{team}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  quickActions: {
    padding: 15,
  },
  actionButton: {
    backgroundColor: '#1E88E5',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  teamsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  teamItem: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 15,
    margin: 5,
    color: '#1E88E5',
  },
});
