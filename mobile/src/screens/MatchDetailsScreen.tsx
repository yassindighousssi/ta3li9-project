import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getAvailableCommentators } from '../services/api';
import { AccessibilityService } from '../services/accessibility';
import { AccessibleButton } from '../components/AccessibleButton';

interface Commentator {
  id: string;
  name: string;
  language: string;
  rating: number;
  isLive: boolean;
}

export const MatchDetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [commentators, setCommentators] = useState<Commentator[]>([]);
  const [selectedCommentator, setSelectedCommentator] = useState<string | null>(null);
  const [isAudioDescription, setIsAudioDescription] = useState(false);

  const matchId = route.params?.matchId;

  useEffect(() => {
    fetchCommentators();
  }, [matchId]);

  const fetchCommentators = async () => {
    try {
      const data = await getAvailableCommentators(matchId);
      setCommentators(data);
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ في تحميل قائمة المعلقين');
    }
  };

  // تفعيل الوصف الصوتي التفصيلي
  const toggleAudioDescription = () => {
    setIsAudioDescription(!isAudioDescription);
    if (!isAudioDescription) {
      AccessibilityService.speak('تم تفعيل الوصف الصوتي التفصيلي');
    } else {
      AccessibilityService.speak('تم إيقاف الوصف الصوتي التفصيلي');
    }
  };

  const renderCommentator = (commentator: Commentator) => (
    <TouchableOpacity
      key={commentator.id}
      style={[
        styles.commentatorCard,
        selectedCommentator === commentator.id && styles.selectedCard
      ]}
      onPress={() => setSelectedCommentator(commentator.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`المعلق ${commentator.name}`}
      accessibilityHint={`يعلق باللغة ${commentator.language}، التقييم ${commentator.rating} من 5`}
    >
      <Text style={styles.commentatorName}>{commentator.name}</Text>
      <Text style={styles.commentatorLanguage}>{commentator.language}</Text>
      <Text style={styles.commentatorRating}>⭐ {commentator.rating}/5</Text>
      {commentator.isLive && (
        <View style={styles.liveIndicator}>
          <Text style={styles.liveText}>مباشر</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text
            style={styles.title}
            accessibilityRole="header"
            accessibilityLabel="تفاصيل المباراة"
          >
            تفاصيل المباراة
          </Text>

          <AccessibleButton
            label={isAudioDescription ? 'إيقاف الوصف التفصيلي' : 'تفعيل الوصف التفصيلي'}
            onPress={toggleAudioDescription}
            style={[
              styles.audioDescriptionButton,
              isAudioDescription && styles.audioDescriptionActive
            ]}
            accessibilityHint="اضغط لتفعيل أو إيقاف الوصف الصوتي التفصيلي للمباراة"
          />
        </View>

        <Text
          style={styles.sectionTitle}
          accessibilityRole="header"
          accessibilityLabel="المعلقون المتاحون"
        >
          المعلقون المتاحون
        </Text>

        <View style={styles.commentatorsList}>
          {commentators.map(renderCommentator)}
        </View>

        {selectedCommentator && (
          <AccessibleButton
            label="بدء الاستماع"
            onPress={() => navigation.navigate('LiveCommentary', {
              commentatorId: selectedCommentator,
              isAudioDescription
            })}
            style={styles.listenButton}
            accessibilityHint="اضغط لبدء الاستماع إلى التعليق المباشر"
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
    color: '#333',
  },
  commentatorsList: {
    padding: 10,
  },
  commentatorCard: {
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
  selectedCard: {
    borderColor: '#1E88E5',
    borderWidth: 2,
  },
  commentatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentatorLanguage: {
    color: '#666',
    marginBottom: 5,
  },
  commentatorRating: {
    color: '#FFA000',
  },
  liveIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 5,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  audioDescriptionButton: {
    backgroundColor: '#4CAF50',
    marginTop: 10,
  },
  audioDescriptionActive: {
    backgroundColor: '#FF9800',
  },
  listenButton: {
    margin: 15,
    backgroundColor: '#1E88E5',
  },
});
