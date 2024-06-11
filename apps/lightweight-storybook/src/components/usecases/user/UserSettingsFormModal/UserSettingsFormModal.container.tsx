import { useMemo } from 'react';
import { UserSettingsFormModal as Presenter } from './UserSettingsFormModal';
import { UserSettingsFormModalContainerContext } from './UserSettingsFormModal.container.context';

type UserSettingsFormModalProps = {
  userId: string;
};

export function UserSettingsFormModal({ userId }: UserSettingsFormModalProps) {
  return (
    <UserSettingsFormModalContainerContext.Provider value={useMemo(() => ({ userId }), [userId])}>
      <Presenter />
    </UserSettingsFormModalContainerContext.Provider>
  );
}
