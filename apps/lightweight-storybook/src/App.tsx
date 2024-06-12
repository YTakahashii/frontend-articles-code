import './styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { UserSettingsFormDialog } from './components/usecases/user/UserSettingsFormDialog';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingsFormDialog userId="1" />
    </QueryClientProvider>
  );
}

export default App;
