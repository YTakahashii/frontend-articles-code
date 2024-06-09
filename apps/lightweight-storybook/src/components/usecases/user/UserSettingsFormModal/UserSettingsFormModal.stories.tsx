import { type StoryObj, type Meta } from '@storybook/react';
import { UserSettingsFormModal } from './UserSettingsFormModal';
import { UserSettingsForm } from './UserSettingsForm/UserSettingsForm';

export default {
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
        component: '',
      },
    },
  },
} satisfies Meta<typeof UserSettingsFormModal>;

type Story = StoryObj<typeof UserSettingsFormModal>;

export const Success: Story = {
  storyName: '成功',
};
