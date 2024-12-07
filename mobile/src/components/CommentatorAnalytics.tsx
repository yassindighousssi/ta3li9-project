import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AnalyticsData {
  dailyListeners: number[];
  matchesPerformance: {
    match: string;
    rating: number;
    listeners: number;
  }[];
  topMatches: {
    match: string;
    listeners: number;
  }[];
  languages: {
    language: string;
    matches: number;
  }[];
}

interface CommentatorAnalyticsProps {
  data: AnalyticsData;
}

export const CommentatorAnalytics: React.FC<CommentatorAnalyticsProps> = ({ data }) => {
  const screenWidth = Dimensions.get('window').width - 40;

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#1E88E5',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="chart-line" size={20} color="#333" /> تحليل المستمعين
        </Text>
        <LineChart
          data={{
            labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            datasets: [{
              data: data.dailyListeners
            }]
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          accessible={true}
          accessibilityLabel="رسم بياني لعدد المستمعين اليومي"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="star" size={20} color="#333" /> أداء المباريات
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.matchesPerformance.map((match, index) => (
            <View key={index} style={styles.performanceCard}>
              <Text style={styles.matchTitle}>{match.match}</Text>
              <View style={styles.performanceStats}>
                <View style={styles.stat}>
                  <Icon name="star" size={16} color="#FFA000" />
                  <Text style={styles.statValue}>{match.rating}/5</Text>
                </View>
                <View style={styles.stat}>
                  <Icon name="account-group" size={16} color="#4CAF50" />
                  <Text style={styles.statValue}>{match.listeners}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="translate" size={20} color="#333" /> التعليق حسب اللغة
        </Text>
        <BarChart
          data={{
            labels: data.languages.map(l => l.language),
            datasets: [{
              data: data.languages.map(l => l.matches)
            }]
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          verticalLabelRotation={30}
          accessible={true}
          accessibilityLabel="رسم بياني لعدد المباريات حسب اللغة"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="trophy" size={20} color="#333" /> أفضل المباريات
        </Text>
        {data.topMatches.map((match, index) => (
          <View key={index} style={styles.topMatch}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.matchName}>{match.match}</Text>
            <View style={styles.listeners}>
              <Icon name="account-group" size={16} color="#4CAF50" />
              <Text style={styles.listenersCount}>{match.listeners}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  performanceCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    width: 150,
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    marginLeft: 5,
    color: '#666',
  },
  topMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginRight: 10,
  },
  matchName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  listeners: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listenersCount: {
    marginLeft: 5,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
