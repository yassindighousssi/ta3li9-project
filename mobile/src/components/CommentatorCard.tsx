import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccessibilityService } from '../services/accessibility';

interface CommentatorCardProps {
  commentator: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    languages: string[];
    stats: {
      followers: number;
      likes: number;
    };
    isFavorite?: boolean;
  };
  onToggleFavorite?: (id: string) => void;
  onPress?: () => void;
}

export const CommentatorCard: React.FC<CommentatorCardProps> = ({
  commentator,
  onToggleFavorite,
  onPress,
}) => {
  const [isFavorite, setIsFavorite] = useState(commentator.isFavorite);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(commentator.id);
    AccessibilityService.speak(
      !isFavorite ? 'تمت إضافة المعلق إلى المفضلة' : 'تمت إزالة المعلق من المفضلة'
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`المعلق ${commentator.name}`}
      accessibilityHint="اضغط لعرض التفاصيل"
    >
      <View style={styles.header}>
        <Image source={{ uri: commentator.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{commentator.name}</Text>
          <Text style={styles.languages}>{commentator.languages.join(' • ')}</Text>
        </View>
        <TouchableOpacity
          onPress={handleFavoritePress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          <Icon
            name={isFavorite ? 'star' : 'star-outline'}
            size={24}
            color={isFavorite ? '#FFA000' : '#666'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Icon name="account-group" size={20} color="#666" />
          <Text style={styles.statText}>{commentator.stats.followers}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="thumb-up" size={20} color="#666" />
          <Text style={styles.statText}>{commentator.stats.likes}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="star" size={20} color="#FFA000" />
          <Text style={styles.statText}>{commentator.rating}/5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  languages: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
});
