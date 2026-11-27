import { Pressable, Text } from 'react-native';
import type { StyledButtonProps } from './types';

const StyledButton = ({ label, isDisabled, onPress, styles }: StyledButtonProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ disabled: isDisabled }}
    disabled={isDisabled}
    onPress={onPress}
    style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
  >
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

export default StyledButton;
