import { type UserSettingsForm, userSettingsForm, userSettingsFormDefault } from './UserSettingsForm.schema';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useDateSelectOptions } from '@/hooks/useDateSelectOptions';

export type UserSettingsFormProps = {
  initialValues?: UserSettingsForm;
  updateUserSettings: (values: UserSettingsForm) => Promise<MutateResult>;
  onValid: (params: {
    values: UserSettingsForm;
    updateUserSettings: UserSettingsFormProps['updateUserSettings'];
  }) => Promise<void>;
};

export function UserSettingsForm({ initialValues, onValid, updateUserSettings }: UserSettingsFormProps) {
  const form = useForm<UserSettingsForm>({
    values: initialValues ?? userSettingsFormDefault,
    resolver: valibotResolver(userSettingsForm),
  });
  const { yearOptions, monthOptions, dayOptions } = useDateSelectOptions();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          return onValid({ values, updateUserSettings });
        })}
      >
        <div className="py-4 space-y-2">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>姓</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>名</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ fieldState: { error } }) => (
              <fieldset className="text-sm" aria-describedby="birthday-error-message">
                <legend data-invalid={!!error} className="data-[invalid='true']:text-destructive">
                  生年月日
                </legend>
                <div className="flex gap-2 mt-2">
                  <FormField
                    control={form.control}
                    name="birthday.year"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            void form.trigger('birthday');
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger aria-label="年">
                              <SelectValue placeholder="年" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent aria-label="年">
                            {yearOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthday.month"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            void form.trigger('birthday');
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger aria-label="月">
                              <SelectValue placeholder="月" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent aria-label="月">
                            {monthOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthday.day"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            void form.trigger('birthday');
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger aria-label="日">
                              <SelectValue placeholder="日" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent aria-label="日">
                            {dayOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {(() => {
                  const birthdayError = error?.message ?? error?.root?.message;
                  if (!birthdayError) {
                    return null;
                  }
                  return (
                    <p id="birthday-error-message" className="text-sm font-medium text-destructive mt-2">
                      {birthdayError}
                    </p>
                  );
                })()}
              </fieldset>
            )}
          />
        </div>
        <div className="flex flex-row-reverse">
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
}
