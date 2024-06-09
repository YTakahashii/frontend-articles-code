import { createContext, useContext } from 'react';

type UserSettingsFormModalContext = {
  userId: string;
};

export const UserSettingsFormModalContext = createContext<UserSettingsFormModalContext | undefined>(undefined);

export function useUserSettingsFormModalContext() {
  const context = useContext(UserSettingsFormModalContext);
  if (context === undefined) {
    throw new Error('useUserSettingsFormModalContext must be used within a UserSettingsFormModalContext.Provider');
  }
  return context;
}
