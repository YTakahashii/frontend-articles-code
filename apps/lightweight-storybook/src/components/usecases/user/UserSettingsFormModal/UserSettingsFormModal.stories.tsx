import { type StoryObj, type Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { UserSettingsFormModal } from './UserSettingsFormModal';
import { UserSettingsForm } from './UserSettingsForm/UserSettingsForm';

const meta = {
  title: 'useCases/user/UserSettingsFormModal',
  component: UserSettingsFormModal,
  args: {
    userSettingsForm: {
      type: 'presenter',
      props: {
        updateUserSettings: async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return { success: true };
        },
      },
      Component: UserSettingsForm,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Suspense境界を持つContainer/Presentationの実践例です。',
      },
    },
  },
} satisfies Meta<typeof UserSettingsFormModal>;

export default meta;

type Story = StoryObj<typeof UserSettingsFormModal>;

const playOpen: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'ユーザ設定' }));
};

const playFillName: Story['play'] = async ({ canvasElement }) => {
  const root = within(canvasElement.parentElement!);
  const dialog = within(root.getByRole('dialog', { name: 'ユーザ設定' }));
  await userEvent.type(dialog.getByLabelText('姓'), '山田');
  await userEvent.type(dialog.getByLabelText('名'), '太郎');
};

const playFillEmail: Story['play'] = async ({ canvasElement }) => {
  const root = within(canvasElement.parentElement!);
  const dialog = within(root.getByRole('dialog', { name: 'ユーザ設定' }));
  await userEvent.type(dialog.getByLabelText('メールアドレス'), 'taro.yamada@example.com');
};

const playFillBirthday: Story['play'] = async ({ canvasElement }) => {
  const root = within(canvasElement.parentElement!);
  const dialog = within(root.getByRole('dialog', { name: 'ユーザ設定' }));
  const birthday = within(dialog.getByRole('group', { name: '生年月日' }));
  await userEvent.click(birthday.getByRole('combobox', { name: '年' }));
  const yearSelect = within(root.getByRole('listbox', { name: '年' }));
  await userEvent.click(yearSelect.getByRole('option', { name: '1996年' }));
  await userEvent.click(birthday.getByRole('combobox', { name: '月' }));
  const monthSelect = within(root.getByRole('listbox', { name: '月' }));
  await userEvent.click(monthSelect.getByRole('option', { name: '11月' }));
  await userEvent.click(birthday.getByRole('combobox', { name: '日' }));
  const daySelect = within(root.getByRole('listbox', { name: '日' }));
  await userEvent.click(daySelect.getByRole('option', { name: '11日' }));
};

const playFillInvalidBirthday: Story['play'] = async ({ canvasElement }) => {
  const root = within(canvasElement.parentElement!);
  const dialog = within(root.getByRole('dialog', { name: 'ユーザ設定' }));
  const birthday = within(dialog.getByRole('group', { name: '生年月日' }));
  await userEvent.click(birthday.getByRole('combobox', { name: '年' }));
  const yearSelect = within(root.getByRole('listbox', { name: '年' }));
  await userEvent.click(yearSelect.getByRole('option', { name: '2024年' }));
  await userEvent.click(birthday.getByRole('combobox', { name: '月' }));
  const monthSelect = within(root.getByRole('listbox', { name: '月' }));
  await userEvent.click(monthSelect.getByRole('option', { name: '2月' }));
  await userEvent.click(birthday.getByRole('combobox', { name: '日' }));
  const daySelect = within(root.getByRole('listbox', { name: '日' }));
  await userEvent.click(daySelect.getByRole('option', { name: '31日' }));
};

const playFillAll: Story['play'] = async (args) => {
  await playFillName(args);
  await playFillEmail(args);
  await playFillBirthday(args);
};

const playSubmit: Story['play'] = async ({ canvasElement }) => {
  const root = within(canvasElement.parentElement!);
  const dialog = within(root.getByRole('dialog', { name: 'ユーザ設定' }));
  await userEvent.click(dialog.getByRole('button', { name: '保存' }));
};

export const Default: Story = {
  name: '初期表示',
  play: playOpen,
};

export const Success: Story = {
  name: '成功',
  play: async (args) => {
    await playOpen(args);
    await playFillAll(args);
    await playSubmit(args);
  },
};

export const Failed: Story = {
  name: '失敗',
  args: {
    userSettingsForm: {
      ...meta.args.userSettingsForm,
      props: {
        ...meta.args.userSettingsForm.props,
        updateUserSettings: async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return { success: false, reason: '処理がタイムアウトしました。' };
        },
      },
    },
  },
  play: async (args) => {
    await playOpen(args);
    await playFillAll(args);
    await playSubmit(args);
  },
};

export const Loading: Story = {
  name: 'ローディング',
  args: {
    userSettingsForm: {
      ...meta.args.userSettingsForm,
      Component: () => {
        throw new Promise((resolve) => {
          resolve(true);
        });
      },
    },
  },
  play: playOpen,
};

export const EmptyValidation: Story = {
  name: '未入力のバリデーションエラー',
  play: async (args) => {
    await playOpen(args);
    await playSubmit(args);
  },
};

export const InvalidDateValidation: Story = {
  name: '誕生日に不正な日付を入力したときのバリデーションエラー',
  play: async (args) => {
    await playOpen(args);
    await playFillName(args);
    await playFillEmail(args);
    await playFillInvalidBirthday(args);
    await playSubmit(args);
  },
};
