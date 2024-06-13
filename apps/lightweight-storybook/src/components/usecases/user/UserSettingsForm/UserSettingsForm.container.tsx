import { useSuspenseQuery } from '@tanstack/react-query';
import { UserSettingsForm as Presenter } from './UserSettingsForm';
import { useUpdateUserMutation, userQueries } from '@/queries/user';
import { selectUpdateUserRequest, selectUserSettingsForm } from './UserSettingsForm.selector';
import { useCallback } from 'react';

export type UserSettingsFormProps = {
  userId: string;
};

export function UserSettingsForm({ userId }: UserSettingsFormProps) {
  const { data: initialValues } = useSuspenseQuery({
    ...userQueries.details({ userId }),
    select: selectUserSettingsForm,
  });
  const { mutateAsync: updateUser } = useUpdateUserMutation({ userId });

  return (
    <Presenter
      initialValues={initialValues}
      updateUserSettings={useCallback(
        async (values) => {
          try {
            const request = selectUpdateUserRequest(values);
            await updateUser(request);
            return {
              success: true,
            };
          } catch (e) {
            const reason = e instanceof Error ? e.message : undefined;
            return { success: false, reason };
          }
        },
        [updateUser],
      )}
    />
  );
}
