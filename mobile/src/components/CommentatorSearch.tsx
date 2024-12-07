import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CommentatorSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  language?: string;
  rating?: number;
  isLive?: boolean;
}

export const CommentatorSearch: React.FC<CommentatorSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const languages = ['العربية', 'الأمازيغية', 'الفرنسية', 'الإنجليزية', 'الإسبانية'];
  const ratings = [5, 4, 3, 2, 1];

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const toggleFilter = (type: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? undefined : value
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="ابحث عن معلق..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="حقل البحث عن معلق"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="عرض خيارات التصفية"
        >
          <Icon name="filter-variant" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="بحث"
        >
          <Icon name="magnify" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>اللغة</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.filterChip,
                  filters.language === lang && styles.activeFilter
                ]}
                onPress={() => toggleFilter('language', lang)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`تصفية حسب اللغة ${lang}`}
              >
                <Text style={[
                  styles.filterText,
                  filters.language === lang && styles.activeFilterText
                ]}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>التقييم</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ratings.map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.filterChip,
                  filters.rating === rating && styles.activeFilter
                ]}
                onPress={() => toggleFilter('rating', rating)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`تصفية حسب التقييم ${rating} نجوم`}
              >
                <Text style={[
                  styles.filterText,
                  filters.rating === rating && styles.activeFilterText
                ]}>
                  {rating} ⭐
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filters.isLive && styles.activeFilter,
              styles.liveFilter
            ]}
            onPress={() => toggleFilter('isLive', true)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="عرض المعلقين النشطين حالياً فقط"
          >
            <Icon
              name="access-point"
              size={16}
              color={filters.isLive ? '#FFF' : '#FF3B30'}
              style={styles.liveIcon}
            />
            <Text style={[
              styles.filterText,
              filters.isLive && styles.activeFilterText
            ]}>
              نشط الآن
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterButton: {
    padding: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#1E88E5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginTop: 10,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  filterChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  activeFilter: {
    backgroundColor: '#1E88E5',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: '#FFF',
  },
  liveFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIcon: {
    marginRight: 5,
  },
});
