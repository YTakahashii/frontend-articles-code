import { type UserSettingsForm, userSettingsForm, userSettingsFormDefault } from './UserSettingsForm.schema';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

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

  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          void onValid({ values, updateUserSettings });
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
                  <FormLabel>姓</FormLabel>
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
            render={() => (
              <FormItem>
                <FormLabel>生年月日</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="birthday.year"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="年" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2024">2024年</SelectItem>
                            <SelectItem value="2023">2023年</SelectItem>
                            <SelectItem value="2022">2022年</SelectItem>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="月" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1月</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="日" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1日</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
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
