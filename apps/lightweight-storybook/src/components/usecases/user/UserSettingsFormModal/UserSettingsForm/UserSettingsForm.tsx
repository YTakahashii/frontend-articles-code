import { type UserSettingsForm, userSettingsForm, userSettingsFormDefault } from './UserSettingsForm.schema';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button, Flex, Select, Stack, TextInput } from '@mantine/core';

export type UserSettingsFormProps = {
  initialValues?: UserSettingsForm;
  updateUserSettings: (values: UserSettingsForm) => Promise<MutateResult>;
  onValid: (params: {
    values: UserSettingsForm;
    updateUserSettings: UserSettingsFormProps['updateUserSettings'];
  }) => Promise<void>;
};

export function UserSettingsForm({ initialValues, onValid, updateUserSettings }: UserSettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsForm>({
    values: initialValues ?? userSettingsFormDefault,
    resolver: valibotResolver(userSettingsForm),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        void onValid({ values, updateUserSettings });
      })}
    >
      <Stack py={2}>
        <Flex gap={4}>
          <TextInput label="姓" {...register('familyName')} error={errors.familyName?.message} />
          <TextInput label="名" {...register('givenName')} error={errors.givenName?.message} />
        </Flex>
        <TextInput label="メールアドレス" {...register('email')} error={errors.email?.message} />
        <Flex gap={4}>
          <Select label="年" {...register('birthday.year')} />
        </Flex>
        <Button type="submit">保存する</Button>
      </Stack>
    </form>
  );
}
