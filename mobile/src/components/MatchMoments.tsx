import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccessibilityService } from '../services/accessibility';

interface MatchMoment {
  id: string;
  type: 'goal' | 'redCard' | 'yellowCard' | 'substitution' | 'important';
  minute: number;
  description: string;
  team: string;
}

interface MatchMomentsProps {
  moments: MatchMoment[];
  onAddMoment?: (type: MatchMoment['type']) => void;
  isCommentator?: boolean;
}

export const MatchMoments: React.FC<MatchMomentsProps> = ({
  moments,
  onAddMoment,
  isCommentator = false,
}) => {
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);

  const getIconName = (type: MatchMoment['type']) => {
    switch (type) {
      case 'goal':
        return 'soccer';
      case 'redCard':
        return 'card';
      case 'yellowCard':
        return 'card-outline';
      case 'substitution':
        return 'swap-horizontal';
      case 'important':
        return 'alert-circle';
      default:
        return 'information';
    }
  };

  const getTypeLabel = (type: MatchMoment['type']) => {
    switch (type) {
      case 'goal':
        return 'هدف';
      case 'redCard':
        return 'بطاقة حمراء';
      case 'yellowCard':
        return 'بطاقة صفراء';
      case 'substitution':
        return 'تبديل';
      case 'important':
        return 'لحظة مهمة';
      default:
        return '';
    }
  };

  const handleMomentPress = (id: string, description: string) => {
    setSelectedMoment(id === selectedMoment ? null : id);
    AccessibilityService.speak(description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>لحظات المباراة</Text>

      {isCommentator && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
          {['goal', 'redCard', 'yellowCard', 'substitution', 'important'].map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.actionButton}
              onPress={() => onAddMoment?.(type as MatchMoment['type'])}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`إضافة ${getTypeLabel(type as MatchMoment['type'])}`}
            >
              <Icon name={getIconName(type as MatchMoment['type'])} size={24} color="#FFF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.momentsList}>
        {moments.map((moment) => (
          <TouchableOpacity
            key={moment.id}
            style={[
              styles.momentItem,
              selectedMoment === moment.id && styles.selectedMoment
            ]}
            onPress={() => handleMomentPress(moment.id, moment.description)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${getTypeLabel(moment.type)} - الدقيقة ${moment.minute}`}
            accessibilityHint={moment.description}
          >
            <View style={styles.momentHeader}>
              <Icon name={getIconName(moment.type)} size={20} color="#1E88E5" />
              <Text style={styles.minute}>{moment.minute}'</Text>
              <Text style={styles.team}>{moment.team}</Text>
            </View>
            <Text style={styles.description}>{moment.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#1E88E5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  momentsList: {
    maxHeight: 300,
  },
  momentItem: {
    borderLeftWidth: 2,
    borderLeftColor: '#1E88E5',
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
  },
  selectedMoment: {
    backgroundColor: '#E3F2FD',
  },
  momentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  minute: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#666',
  },
  team: {
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
