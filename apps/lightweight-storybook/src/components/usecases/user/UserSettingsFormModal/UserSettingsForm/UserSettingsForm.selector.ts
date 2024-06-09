import { UpdateUserRequest, User } from '../../../../../boudary/api/generated';
import { type UserSettingsForm, userSettingsFormDefault } from './UserSettingsForm.schema';

export function selectUserSettingsForm(user: User): UserSettingsForm {
  const [year, month, day] = user.birthday.split('-');
  const birthday = year && month && day ? { year: year, month: month, day: day } : userSettingsFormDefault.birthday;

  return {
    familyName: user.familyName,
    givenName: user.givenName,
    email: user.email,
    birthday,
  };
}

export function selectUpdateUserRequest({
  birthday: { year, month, day },
  email,
  familyName,
  givenName,
}: UserSettingsForm): UpdateUserRequest {
  return {
    email,
    familyName,
    givenName,
    birthday: `${year}-${month}-${day}`,
  };
}
