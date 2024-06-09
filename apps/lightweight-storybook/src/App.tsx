import './styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { Button } from './components/ui/button';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Button>Click me</Button>
    </QueryClientProvider>
  );
}

export default App;
