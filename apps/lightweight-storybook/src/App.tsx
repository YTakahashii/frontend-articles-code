import '@mantine/core/styles.css';
import { MantineProvider, Button } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Button>Hello Mantine!</Button>
    </MantineProvider>
  );
}

export default App;
