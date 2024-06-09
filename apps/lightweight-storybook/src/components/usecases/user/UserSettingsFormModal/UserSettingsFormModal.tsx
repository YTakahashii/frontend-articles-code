import { Button, Modal, ButtonProps, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Suspense, useCallback, useState } from 'react';
import { UserSettingsForm, UserSettingsFormProps } from './UserSettingsForm/UserSettingsForm';
import {
  UserSettingsForm as UserSettingsFormContainer,
  UserSettingsFormProps as UserSettingsFormContainerProps,
} from './UserSettingsForm/UserSettingsForm.container';

type UserSettingsFormModalProps = {
  invokeButtonProps?: ButtonProps;
  userSettingsForm?:
    | {
        type: 'container';
        Component: typeof UserSettingsFormContainer;
      }
    | {
        type: 'presenter';
        props: Omit<UserSettingsFormProps, keyof UserSettingsFormContainerProps>;
        Component: typeof UserSettingsForm;
      };
};

type UserSettingsFormModalState = {
  status: 'idle' | 'loading' | 'error';
  errorMessage: string | undefined;
};

const initialState: UserSettingsFormModalState = {
  status: 'idle',
  errorMessage: undefined,
};

export function UserSettingsFormModal({
  invokeButtonProps,
  userSettingsForm = {
    type: 'container',
    Component: UserSettingsFormContainer,
  },
}: UserSettingsFormModalProps) {
  const [opened, { open, close }] = useDisclosure();
  const [state, setState] = useState(initialState);

  const handleValid: UserSettingsFormProps['onValid'] = useCallback(
    async ({ values, updateUserSettings }) => {
      setState((prev) => ({
        ...prev,
        status: 'loading',
      }));
      const result = await updateUserSettings(values);
      if (result.success) {
        close();
        setState(initialState);
      } else {
        setState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: result.reason ?? '原因不明のエラーです。',
        }));
      }
    },
    [close],
  );

  return (
    <>
      <Button onClick={open} {...invokeButtonProps}>
        設定する
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="ユーザ設定"
        closeButtonProps={{
          disabled: state.status === 'loading',
        }}
      >
        {state.status === 'error' && <Box color="red">設定士に失敗しました。</Box>}
        <Suspense fallback={<Box>Loading...</Box>}>
          {userSettingsForm.type === 'container' ? (
            <userSettingsForm.Component onValid={handleValid} />
          ) : (
            <userSettingsForm.Component {...userSettingsForm.props} onValid={handleValid} />
          )}
        </Suspense>
      </Modal>
    </>
  );
}
