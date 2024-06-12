import { render, waitFor, screen, fireEvent, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as stories from './UserSettingsFormDialog.stories';
import { composeStories } from '@storybook/react';

const composedStories = composeStories(stories);

describe('UserSettingsFormDialog', () => {
  describe('保存に失敗する場合', () => {
    const { Failed } = composedStories;
    test('エラーメッセージが表示されること', async () => {
      const { container, getByRole } = render(<Failed />);
      await waitFor(async () => {
        await Failed.play?.({ canvasElement: container });
      });
      const dialog = within(getByRole('dialog', { name: 'ユーザ設定' }));
      await waitFor(() => {
        expect(dialog.queryByRole('alert', { name: /ユーザ設定に失敗しました/ })).toBeInTheDocument();
        const alert = dialog.getByRole('alert', { name: /ユーザ設定に失敗しました/ });
        expect(alert).toHaveAccessibleDescription('処理がタイムアウトしました。');
      });
    });
  });
  describe('すべて入力済みの場合', () => {
    const { Filled } = composedStories;
    test('保存するとモーダルが閉じること', async () => {
      const { container, queryByRole } = render(<Filled />);
      await waitFor(async () => {
        await Filled.play?.({ canvasElement: container });
      });
      await waitFor(() => {
        expect(queryByRole('dialog', { name: 'ユーザ設定' })).toBeInTheDocument();
      });
      const submitButton = screen.getByRole('button', { name: '保存' });
      fireEvent.click(submitButton); // userEvent.click を使うとonSubmitが呼ばれないのでfireEvent.clickを使っている ref. https://github.com/testing-library/user-event/issues/1032
      await waitFor(() => {
        expect(queryByRole('dialog', { name: 'ユーザ設定' })).not.toBeInTheDocument();
      });
    });
    // memo: このテストを並列実行すると何故か未入力の場合のテストが失敗するので、concurrent: false にしている
    test('閉じると入力が初期状態に戻ること', { concurrent: false }, async () => {
      const { container, queryByRole, getByRole } = render(<Filled />);
      await waitFor(async () => {
        await Filled.play?.({ canvasElement: container });
      });
      await waitFor(() => {
        expect(queryByRole('dialog', { name: 'ユーザ設定' })).toBeInTheDocument();
      });
      const dialog = within(getByRole('dialog', { name: 'ユーザ設定' }));
      const closeButton = dialog.getByRole('button', { name: '閉じる' });
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(queryByRole('button', { name: '設定する' })).toBeInTheDocument();
      });
      await userEvent.click(getByRole('button', { name: '設定する' }));
      await waitFor(() => {
        expect(queryByRole('dialog', { name: 'ユーザ設定' })).toBeInTheDocument();
      });
      const dialogReopened = within(getByRole('dialog', { name: 'ユーザ設定' }));

      const familyName = dialogReopened.getByLabelText('姓');
      const givenName = dialogReopened.getByLabelText('名');
      const email = dialogReopened.getByLabelText('メールアドレス');
      const birthday = dialogReopened.getByRole('group', { name: '生年月日' });
      const year = within(birthday).getByRole('combobox', { name: '年' });
      const month = within(birthday).getByRole('combobox', { name: '月' });
      const day = within(birthday).getByRole('combobox', { name: '日' });

      await waitFor(() => {
        expect(familyName).toHaveValue('');
        expect(givenName).toHaveValue('');
        expect(email).toHaveValue('');
        expect(year).toHaveValue('');
        expect(month).toHaveValue('');
        expect(day).toHaveValue('');
      });
    });
  });

  describe('ローディング中の場合', () => {
    const { Loading } = composedStories;
    test('読み込み状態が表示されること', async () => {
      const { container, getByRole } = render(<Loading />);
      await waitFor(async () => {
        await Loading.play?.({ canvasElement: container });
      });
      const dialog = getByRole('dialog', { name: 'ユーザ設定' });
      await waitFor(() => {
        expect(dialog).toHaveTextContent('読み込み中...');
      });
    });
  });

  describe('未入力の場合', () => {
    const { EmptyValidation } = composedStories;
    test('未入力のバリデーションエラーが表示されること', async () => {
      const { container, getByRole } = render(<EmptyValidation />);
      await waitFor(async () => {
        await EmptyValidation.play?.({ canvasElement: container });
      });
      const dialog = within(getByRole('dialog', { name: 'ユーザ設定' }));
      const familyName = dialog.getByLabelText('姓');
      const givenName = dialog.getByLabelText('名');
      const email = dialog.getByLabelText('メールアドレス');
      const birthday = dialog.getByRole('group', { name: '生年月日' });
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
      const dialog = within(getByRole('dialog', { name: 'ユーザ設定' }));
      const birthday = dialog.getByRole('group', { name: '生年月日' });

      await waitFor(() => {
        expect(birthday).toHaveAccessibleDescription('正しい日付を入力してください。');
      });
    });
  });
});
