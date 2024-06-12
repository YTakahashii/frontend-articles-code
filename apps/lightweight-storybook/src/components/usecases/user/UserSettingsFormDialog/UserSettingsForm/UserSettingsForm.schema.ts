import * as v from 'valibot';

export const userSettingsForm = v.object({
  familyName: v.pipe(
    v.string('姓は文字列で入力してください。'),
    v.nonEmpty('姓を入力してください。'),
    v.maxLength(50, '50文字以内で入力してください。'),
  ),
  givenName: v.pipe(
    v.string('名は文字列で入力してください。'),
    v.nonEmpty('名を入力してください。'),
    v.maxLength(50, '50文字以内で入力してください。'),
  ),
  email: v.pipe(
    v.string('メールアドレスは文字列で入力してください。'),
    v.nonEmpty('メールアドレスを入力してください。'),
    v.email('適切なメールアドレスを入力してください。'),
  ),
  birthday: v.pipe(
    v.object({
      year: v.pipe(v.string(), v.nonEmpty('年を入力してください。')),
      month: v.pipe(v.string(), v.nonEmpty('月を入力してください。')),
      day: v.pipe(v.string(), v.nonEmpty('日を入力してください。')),
    }),
    v.check(({ year, month, day }) => {
      const isoDate = v.pipe(v.string(), v.isoDate());
      const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const isIsoDate = v.safeParse(isoDate, date).success;
      const isValidDate = new Date(date).getDate() === Number(day);
      return isIsoDate && isValidDate;
    }, '正しい日付を入力してください。'),
  ),
});

export type UserSettingsForm = v.InferInput<typeof userSettingsForm>;

export const userSettingsFormDefault: UserSettingsForm = {
  givenName: '',
  familyName: '',
  birthday: {
    year: '',
    month: '',
    day: '',
  },
  email: '',
};
