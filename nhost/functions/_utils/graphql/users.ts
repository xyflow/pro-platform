import { NhostClient, signInEmailPasswordlessPromise } from '@nhost/nhost-js';
import { gql } from 'graphql-request';

import GraphQLClient from './client';
import { IS_DEVELOPMENT, IS_STAGING } from '../constants';

export const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN,
  region: process.env.NHOST_REGION,
});

// @todo this can be removed once we switch to the domain pro.reactflow.dev
export const redirectUrl = IS_DEVELOPMENT || IS_STAGING ? '/' : 'https://pro-beta.reactflow.dev';

export async function createUser({ email }: { email: string }) {
  if (!email) {
    return false;
  }

  // https://github.com/nhost/nhost/blob/main/packages/react/src/useAuthInterpreter.ts
  const interpreter = nhost.auth.client.interpreter;

  // @todo this can be removed once we switch to the domain pro.reactflow.dev
  // this is being done because we can't pass a redirect url to the signIn function
  if (interpreter) {
    return await signInEmailPasswordlessPromise(interpreter, email, { redirectTo: redirectUrl });
  }

  // use signIn instead of signUp because we don't want to set a password (we use magic link)
  return await nhost.auth.signIn({ email });
}

type User = {
  email: string;
  id: string;
};

type GetUserByMailResponse = {
  users: User[];
};

const GET_USER_BY_MAIL = gql`
  query GetUserByMail($email: citext!) {
    users(where: { email: { _eq: $email } }) {
      email
      id
    }
  }
`;

export async function getUserIdByEmail(email: string): Promise<string> {
  const response = await GraphQLClient.request<GetUserByMailResponse>(GET_USER_BY_MAIL, { email });
  return response.users?.[0]?.id;
}

const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    user(id: $id) {
      email
      id
    }
  }
`;

export async function getUser(id: string): Promise<User | null> {
  const response = await GraphQLClient.request<{ user: User }>(GET_USER_BY_ID, {
    id,
  });

  return response.user;
}
