import '@mantine/core/styles.css';
import { MantineProvider, Button } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Button>Hello Mantine!</Button>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
