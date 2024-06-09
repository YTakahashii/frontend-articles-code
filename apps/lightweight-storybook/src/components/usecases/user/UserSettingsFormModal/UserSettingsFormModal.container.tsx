import { useMemo } from 'react';
import { UserSettingsFormModal as Presenter } from './UserSettingsFormModal';
import { UserSettingsFormModalContext } from './UserSettingsFormModal.context';

type UserSettingsFormModalProps = {
  userId: string;
};

export function UserSettingsFormModal({ userId }: UserSettingsFormModalProps) {
  return (
    <UserSettingsFormModalContext.Provider value={useMemo(() => ({ userId }), [userId])}>
      <Presenter />
    </UserSettingsFormModalContext.Provider>
  );
}
