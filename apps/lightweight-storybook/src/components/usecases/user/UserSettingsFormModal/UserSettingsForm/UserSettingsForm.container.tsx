import { useSuspenseQuery } from '@tanstack/react-query';
import { UserSettingsForm as Presenter, type UserSettingsFormProps as PresenterProps } from './UserSettingsForm';
import { useUpdateUserMutation, userQueries } from '../../../../../queries/user';
import { selectUpdateUserRequest, selectUserSettingsForm } from './UserSettingsForm.selector';
import { useCallback } from 'react';
import { useUserSettingsFormModalContainerContext } from '../UserSettingsFormModal.container.context';

export type UserSettingsFormProps = Pick<PresenterProps, 'onValid'>;

export function UserSettingsForm({ onValid }: UserSettingsFormProps) {
  const { userId } = useUserSettingsFormModalContainerContext();
  const { data: initialValues } = useSuspenseQuery({
    ...userQueries.details({ userId }),
    select: selectUserSettingsForm,
  });
  const { mutateAsync: updateUser } = useUpdateUserMutation({ userId });

  return (
    <Presenter
      initialValues={initialValues}
      onValid={onValid}
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
