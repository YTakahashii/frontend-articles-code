import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getUser, updateUser, type UpdateUserRequest } from '../boudary/api/generated';

const userKey = {
  all: ['user'] as const,
  byUserId: (userId: string) => [...userKey.all, userId] as const,
  details: (userId: string) => [...userKey.byUserId(userId), 'details'] as const,
};

export function useUserCache() {
  const queryClient = useQueryClient();
  return useMemo(
    () => ({
      invalidateAll: () => {
        return queryClient.invalidateQueries({
          queryKey: userKey.all,
        });
      },
      invalidateByUserId: (userId: string) => {
        return queryClient.invalidateQueries({
          queryKey: userKey.byUserId(userId),
        });
      },
    }),
    [queryClient],
  );
}

export const userQueries = {
  details: ({ userId }: { userId: string }) => {
    return queryOptions({
      queryKey: userKey.details(userId),
      queryFn: () => {
        return getUser(userId);
      },
    });
  },
};

type UseUpdateUserMutationProps = {
  userId: string;
};

export function useUpdateUserMutation({ userId }: UseUpdateUserMutationProps) {
  const userCache = useUserCache();
  return useMutation({
    mutationFn: async (request: UpdateUserRequest) => {
      return updateUser(userId, request);
    },
    onSuccess: () => {
      return userCache.invalidateByUserId(userId);
    },
  });
}
