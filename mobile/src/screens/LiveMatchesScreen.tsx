import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../components/Logo';
import { AccessibleButton } from '../components/AccessibleButton';

interface Match {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
  };
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  commentators: number;
  viewers: number;
}

export const LiveMatchesScreen: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    // هنا سيتم جلب المباريات من API
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => navigation.navigate('MatchDetails', { matchId: item.id })}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`مباراة ${item.homeTeam.name} ضد ${item.awayTeam.name}`}
      accessibilityHint={`النتيجة ${item.homeTeam.score} - ${item.awayTeam.score}`}
    >
      <View style={styles.matchHeader}>
        <Text style={styles.time}>{item.time}</Text>
        {item.status === 'live' && (
          <View style={styles.liveIndicator}>
            <Text style={styles.liveText}>مباشر</Text>
          </View>
        )}
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          <Image source={{ uri: item.homeTeam.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{item.homeTeam.name}</Text>
          <Text style={styles.score}>{item.homeTeam.score}</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.team}>
          <Image source={{ uri: item.awayTeam.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{item.awayTeam.name}</Text>
          <Text style={styles.score}>{item.awayTeam.score}</Text>
        </View>
      </View>

      <View style={styles.matchFooter}>
        <Text style={styles.stats}>👥 {item.viewers}</Text>
        <Text style={styles.stats}>🎙️ {item.commentators}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" />
        <Text style={styles.title}>المباريات المباشرة</Text>
      </View>

      <FlatList
        data={matches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        accessible={true}
        accessibilityLabel="قائمة المباريات المباشرة"
      />

      <View style={styles.quickActions}>
        <AccessibleButton
          label="ابدأ التعليق"
          onPress={() => navigation.navigate('CommentatorMode')}
          style={[styles.actionButton, styles.commentButton]}
          accessibilityHint="انتقل إلى وضع التعليق"
        />
        <AccessibleButton
          label="استمع للمباراة"
          onPress={() => navigation.navigate('ListenerMode')}
          style={[styles.actionButton, styles.listenButton]}
          accessibilityHint="انتقل إلى وضع الاستماع"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  list: {
    padding: 10,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  time: {
    color: '#666',
  },
  liveIndicator: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 5,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  vs: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 10,
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  stats: {
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  commentButton: {
    backgroundColor: '#1E88E5',
  },
  listenButton: {
    backgroundColor: '#4CAF50',
  },
});
