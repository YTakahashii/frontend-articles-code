import { Button, type ButtonProps } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/Dialog';

import { Suspense, useCallback, useState } from 'react';
import {
  UserSettingsForm as UserSettingsFormPresenter,
  UserSettingsFormProps as UserSettingsFormPresenterProps,
} from './UserSettingsForm/UserSettingsForm';
import {
  UserSettingsForm as UserSettingsFormContainer,
  UserSettingsFormProps as UserSettingsFormContainerProps,
} from './UserSettingsForm/UserSettingsForm.container';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { AlertCircle } from 'lucide-react';

export type UserSettingsFormDialogProps = {
  invokeButtonProps?: ButtonProps;
  UserSettingsForm?: typeof UserSettingsFormPresenter;
  userSettingsFormProps?: StorybookProps<UserSettingsFormContainerProps, UserSettingsFormPresenterProps>;
};

type UserSettingsFormDialogState = {
  status: 'idle' | 'loading' | 'error';
  errorMessage: string | undefined;
};

const initialState: UserSettingsFormDialogState = {
  status: 'idle',
  errorMessage: undefined,
};

export function UserSettingsFormDialog({
  invokeButtonProps,
  UserSettingsForm = UserSettingsFormPresenter,
  userSettingsFormProps,
}: UserSettingsFormDialogProps) {
  const [opened, { open, close, set }] = useDisclosure();
  const [state, setState] = useState(initialState);

  const handleValid: UserSettingsFormPresenterProps['onValid'] = useCallback(
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
    <Dialog open={opened} onOpenChange={set}>
      <DialogTrigger asChild>
        <Button onClick={open} {...invokeButtonProps}>
          設定する
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ユーザ設定</DialogTitle>
        </DialogHeader>
        <div>
          {state.status === 'error' ? (
            <Alert variant="destructive" aria-labelledby="error-alert-title" aria-describedby="error-alert-description">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle id="error-alert-title">ユーザ設定に失敗しました</AlertTitle>
              {state.errorMessage ? (
                <AlertDescription id="error-alert-description">{state.errorMessage}</AlertDescription>
              ) : null}
            </Alert>
          ) : null}
          <Suspense fallback={<div className="text-center">読み込み中...</div>}>
            {userSettingsFormProps ? (
              <UserSettingsForm {...userSettingsFormProps} onValid={handleValid} />
            ) : (
              <UserSettingsFormContainer onValid={handleValid} />
            )}
          </Suspense>
        </div>
        <DialogClose disabled={state.status === 'loading'} />
      </DialogContent>
    </Dialog>
  );
}
