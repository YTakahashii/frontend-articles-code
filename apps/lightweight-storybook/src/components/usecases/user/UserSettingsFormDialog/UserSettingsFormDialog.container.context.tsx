import { createContext, useContext } from 'react';

type UserSettingsFormDialogContainerContext = {
  userId: string;
};

export const UserSettingsFormDialogContainerContext = createContext<UserSettingsFormDialogContainerContext | undefined>(
  undefined,
);

export function useUserSettingsFormDialogContainerContext() {
  const context = useContext(UserSettingsFormDialogContainerContext);
  if (context === undefined) {
    throw new Error('useUserSettingsFormDialogContext must be used within a UserSettingsFormDialogContext.Provider');
  }
  return context;
}
