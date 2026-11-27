import { useState } from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@platter/components';
import { theme } from '@platter/tokens';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 64,
        paddingHorizontal: theme.spacing[5],
        backgroundColor: theme.colors.surface.background,
        alignItems: 'flex-start',
        gap: theme.spacing[3],
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: '700', color: theme.colors.surface.text }}>
        Platter mobile
      </Text>
      <Text style={{ color: theme.colors.surface.text }}>Pressed {count} times</Text>
      <Button onPress={() => setCount((c) => c + 1)}>Primary</Button>
      <Button variant="secondary" onPress={() => setCount(0)}>
        Reset
      </Button>
      <Button isDisabled>Disabled</Button>
      <StatusBar style="dark" />
    </View>
  );
};
