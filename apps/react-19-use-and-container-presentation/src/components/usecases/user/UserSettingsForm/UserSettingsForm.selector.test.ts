import { User } from '@/boudary/api/generated';
import { selectUpdateUserRequest, selectUserSettingsForm } from './UserSettingsForm.selector';
import { UserSettingsForm } from './UserSettingsForm.schema';

describe('UserSettingsForm.selector', () => {
  describe('selectUserSettingsForm', () => {
    test('ユーザ情報からフォームの初期値を生成する', () => {
      const user: User = {
        id: '1',
        birthday: '2000-01-01',
        email: 'yamada.taro@example.com',
        familyName: '山田',
        givenName: '太郎',
      };
      const actual = selectUserSettingsForm(user);
      expect(actual).toEqual({
        birthday: { year: '2000', month: '01', day: '01' },
        email: 'yamada.taro@example.com',
        familyName: '山田',
        givenName: '太郎',
      });
    });
  });

  describe('selectUpdateUserRequest', () => {
    test('フォームの値からユーザ情報更新リクエストを生成する', () => {
      const form: UserSettingsForm = {
        birthday: { year: '2000', month: '01', day: '01' },
        email: 'yamada.taro@example.com',
        familyName: '山田',
        givenName: '太郎',
      };
      const actual = selectUpdateUserRequest(form);
      expect(actual).toEqual({
        birthday: '2000-01-01',
        email: 'yamada.taro@example.com',
        familyName: '山田',
        givenName: '太郎',
      });
    });
  });
});
