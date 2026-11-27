import { useState } from 'react';
import { Button } from '@platter/components';
import { theme } from '@platter/tokens';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: theme.spacing[5],
        backgroundColor: theme.colors.surface.background,
        color: theme.colors.surface.text,
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing[3],
      }}
    >
      <h1>Platter web</h1>
      <p>Pressed {count} times</p>
      <Button onPress={() => setCount((c) => c + 1)}>Primary</Button>
      <Button variant="secondary" onPress={() => setCount(0)}>
        Reset
      </Button>
      <Button isDisabled>Disabled</Button>
    </main>
  );
};
