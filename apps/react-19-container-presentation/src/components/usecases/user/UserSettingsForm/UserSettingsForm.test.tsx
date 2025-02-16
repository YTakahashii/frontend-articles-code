import { render, waitFor, within } from '@testing-library/react';
import * as stories from './UserSettingsForm.stories';
import { composeStories } from '@storybook/react';

const composedStories = composeStories(stories);

describe('UserSettingsForm', () => {
  describe('保存に成功する場合', () => {
    const { Success } = composedStories;
    test('成功メッセージが表示されること', async () => {
      const { container, queryByRole } = render(<Success />);
      await waitFor(async () => {
        await Success.play?.({ canvasElement: container });
      });
      await waitFor(() => {
        expect(queryByRole('alert', { name: 'ユーザ設定を保存しました' })).toBeInTheDocument();
      });
    });
  });
  describe('保存に失敗する場合', () => {
    const { Failed } = composedStories;
    test('エラーメッセージが表示されること', async () => {
      const { container, getByRole, queryByRole } = render(<Failed />);
      await waitFor(async () => {
        await Failed.play?.({ canvasElement: container });
      });
      await waitFor(() => {
        expect(queryByRole('alert', { name: /ユーザ設定に失敗しました/ })).toBeInTheDocument();
        const alert = getByRole('alert', { name: /ユーザ設定に失敗しました/ });
        expect(alert).toHaveAccessibleDescription('処理がタイムアウトしました。');
      });
    });
  });

  describe('未入力の場合', () => {
    const { EmptyValidation } = composedStories;
    test('未入力のバリデーションエラーが表示されること', async () => {
      const { container, getByRole, getByLabelText } = render(<EmptyValidation />);
      await waitFor(async () => {
        await EmptyValidation.play?.({ canvasElement: container });
      });
      const familyName = getByLabelText('姓');
      const givenName = getByLabelText('名');
      const email = getByLabelText('メールアドレス');
      const birthday = getByRole('group', { name: '生年月日' });
      const year = within(birthday).getByRole('combobox', { name: '年' });
      const month = within(birthday).getByRole('combobox', { name: '月' });
      const day = within(birthday).getByRole('combobox', { name: '日' });

      await waitFor(() => {
        expect(familyName).toHaveAccessibleDescription('姓を入力してください。');
        expect(givenName).toHaveAccessibleDescription('名を入力してください。');
        expect(email).toHaveAccessibleDescription('メールアドレスを入力してください。');
        expect(year).toHaveAccessibleDescription('年を入力してください。');
        expect(month).toHaveAccessibleDescription('月を入力してください。');
        expect(day).toHaveAccessibleDescription('日を入力してください。');
      });
    });
  });

  describe('誕生日に不正な日付を入力したときのバリデーションエラー', () => {
    const { InvalidBirthdayValidation } = composedStories;
    test('不正な日付のバリデーションエラーが表示されること', async () => {
      const { container, getByRole } = render(<InvalidBirthdayValidation />);
      await waitFor(async () => {
        await InvalidBirthdayValidation.play?.({ canvasElement: container });
      });
      const birthday = getByRole('group', { name: '生年月日' });

      await waitFor(() => {
        expect(birthday).toHaveAccessibleDescription('正しい日付を入力してください。');
      });
    });
  });
});
