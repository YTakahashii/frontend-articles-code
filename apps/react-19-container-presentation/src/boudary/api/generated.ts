/**
 * APIクライアントのモック
 */

export type User = {
  id: string;
  familyName: string;
  givenName: string;
  email: string;
  birthday: string;
};

let userDb: User = {
  id: '1',
  familyName: 'Doe',
  givenName: 'John',
  email: 'john.date@example.com',
  birthday: '2000-01-01',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUser(_userId: string) {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve(userDb);
    }, 1000);
  });
}

export type UpdateUserRequest = {
  familyName: string;
  givenName: string;
  email: string;
  birthday: string;
};

export async function updateUser(_userId: string, request: UpdateUserRequest) {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      userDb = {
        ...userDb,
        ...request,
      };
      resolve(userDb);
    }, 1000);
  });
}
