import { type UserSettingsFormSchema, userSettingsForm, userSettingsFormDefault } from './UserSettingsForm.schema';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDateSelectOptions } from '@/hooks/useDateSelectOptions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useState, use } from 'react';
import { type MutateResult } from '@/@types/utilities';
import { withSuspense } from '@/lib/with-suspense';
import { withErrorBoundary } from 'react-error-boundary';
export type UserSettingsFormProps = {
  initialValues?: Promise<UserSettingsFormSchema>;
  updateUserSettings: (values: UserSettingsFormSchema) => Promise<MutateResult>;
};

type UserSettingsFormState = {
  status: 'idle' | 'success' | 'error';
  errorMessage: string | undefined;
};

const initialState: UserSettingsFormState = {
  status: 'idle',
  errorMessage: undefined,
};

export const UserSettingsForm = withErrorBoundary(
  withSuspense(UserSettingsFormImpl, { fallback: <div>loading...</div> }),
  {
    fallbackRender: (props) => {
      return <div>error... :{props.error}</div>;
    },
  },
);

function UserSettingsFormImpl({ initialValues, updateUserSettings }: UserSettingsFormProps) {
  const values = initialValues ? use(initialValues) : userSettingsFormDefault;
  const form = useForm<UserSettingsFormSchema>({
    values,
    resolver: valibotResolver(userSettingsForm),
  });
  const { yearOptions, monthOptions, dayOptions } = useDateSelectOptions();
  const [state, setState] = useState(initialState);

  return (
    <Form {...form}>
      {state.status === 'success' ? (
        <Alert aria-labelledby="success-alert-title">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle id="success-alert-title">ユーザ設定を保存しました</AlertTitle>
        </Alert>
      ) : state.status === 'error' ? (
        <Alert variant="destructive" aria-labelledby="error-alert-title" aria-describedby="error-alert-description">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle id="error-alert-title">ユーザ設定に失敗しました</AlertTitle>
          {state.errorMessage ? (
            <AlertDescription id="error-alert-description">{state.errorMessage}</AlertDescription>
          ) : null}
        </Alert>
      ) : null}
      <form
        onSubmit={form.handleSubmit(async (values) => {
          setState(initialState);
          const result = await updateUserSettings(values);
          if (result.success) {
            setState((prev) => ({
              ...prev,
              status: 'success',
            }));
          } else {
            setState((prev) => ({
              ...prev,
              status: 'error',
              errorMessage: result.reason ?? '原因不明のエラーです。',
            }));
          }
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
                            if (form.formState.isSubmitted) {
                              void form.trigger('birthday');
                            }
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
                            if (form.formState.isSubmitted) {
                              void form.trigger('birthday');
                            }
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
                            if (form.formState.isSubmitted) {
                              void form.trigger('birthday');
                            }
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
          <Button type="submit">保存</Button>
        </div>
      </form>
    </Form>
  );
}
