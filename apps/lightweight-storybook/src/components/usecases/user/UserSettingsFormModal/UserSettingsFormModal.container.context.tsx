import { createContext, useContext } from 'react';

type UserSettingsFormModalContainerContext = {
  userId: string;
};

export const UserSettingsFormModalContainerContext = createContext<UserSettingsFormModalContainerContext | undefined>(
  undefined,
);

export function useUserSettingsFormModalContainerContext() {
  const context = useContext(UserSettingsFormModalContainerContext);
  if (context === undefined) {
    throw new Error('useUserSettingsFormModalContext must be used within a UserSettingsFormModalContext.Provider');
  }
  return context;
}
