import { QueryClientProvider } from '@tanstack/react-query';
import { UserSettingsForm } from './components/usecases/user/UserRegistrationDialog/UserRegistrationForm';
import { queryClient } from './lib/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>App</h1>
        <UserSettingsForm userId="1" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
