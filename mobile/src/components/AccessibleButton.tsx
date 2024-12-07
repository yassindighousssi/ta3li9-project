import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  AccessibilityProps,
  StyleSheet,
  Platform 
} from 'react-native';

interface AccessibleButtonProps extends AccessibilityProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// زر قابل للوصول مع دعم كامل لقارئ الشاشة
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  ...accessibilityProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton
      ]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`اضغط ${title}`}
      accessibilityState={{ disabled }}
      {...accessibilityProps}
    >
      <Text style={[
        styles.text,
        variant === 'primary' ? styles.primaryText : styles.secondaryText,
        disabled && styles.disabledText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#007AFF',
  },
  disabledText: {
    color: '#666666',
  },
});
