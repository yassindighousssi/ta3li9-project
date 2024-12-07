import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const Logo: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'large':
        return 120;
      default:
        return 80;
    }
  };

  return (
    <View style={[styles.container, { width: getSize(), height: getSize() }]}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
        accessibilityLabel="شعار تطبيق تعليق"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
