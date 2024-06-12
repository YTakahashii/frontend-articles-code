import { useMemo } from 'react';
import { UserSettingsFormDialog as Presenter } from './UserSettingsFormDialog';
import { UserSettingsFormDialogContainerContext } from './UserSettingsFormDialog.container.context';

type UserSettingsFormDialogProps = {
  userId: string;
};

export function UserSettingsFormDialog({ userId }: UserSettingsFormDialogProps) {
  return (
    <UserSettingsFormDialogContainerContext.Provider value={useMemo(() => ({ userId }), [userId])}>
      <Presenter />
    </UserSettingsFormDialogContainerContext.Provider>
  );
}
