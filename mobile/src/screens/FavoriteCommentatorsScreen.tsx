import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { CommentatorCard } from '../components/CommentatorCard';
import { Logo } from '../components/Logo';

interface Commentator {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  languages: string[];
  stats: {
    followers: number;
    likes: number;
  };
  isFavorite: boolean;
}

export const FavoriteCommentatorsScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Commentator[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    // هنا سيتم جلب المعلقين المفضلين من API
  };

  const handleToggleFavorite = async (commentatorId: string) => {
    // هنا سيتم إرسال طلب إلى API لإزالة المعلق من المفضلة
    setFavorites(favorites.filter(c => c.id !== commentatorId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" />
        <Text style={styles.title}>المعلقون المفضلون</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <CommentatorCard
            commentator={item}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        accessible={true}
        accessibilityLabel="قائمة المعلقين المفضلين"
      />

      {favorites.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            لم تقم بإضافة أي معلق إلى المفضلة بعد
          </Text>
        </View>
      )}
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
