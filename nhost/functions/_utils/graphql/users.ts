import { NhostClient } from '@nhost/nhost-js';
import { gql } from 'graphql-request';

import GraphQLClient from './client';

export const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN,
  region: process.env.NHOST_REGION,
});

const CREATE_USER = gql`
  mutation InsertUser($email: citext!, $framework: String) {
    insertUser(object: { email: $email, locale: "en", metadata: { framework: $framework } }) {
      id
      email
    }
  }
`;

type User = {
  email: string;
  id: string;
  metadata?: Record<string, any>;
};

type GetUserByMailResponse = {
  users: User[];
};

export async function createUser({ email, framework = 'react' }: { email: string; framework?: string }) {
  if (!email) {
    return false;
  }

  return await GraphQLClient.request<GetUserByMailResponse>(CREATE_USER, { email, framework });
}

const GET_USER_BY_MAIL = gql`
  query GetUserByMail($email: citext!) {
    users(where: { email: { _eq: $email } }) {
      email
      id
      metadata
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
      metadata
    }
  }
`;

export async function getUser(id: string): Promise<User | null> {
  const response = await GraphQLClient.request<{ user: User }>(GET_USER_BY_ID, {
    id,
  });

  return response.user;
}

const DELETE_USER_DATA = gql`
  mutation DeleteUserData($id: uuid!) {
    delete_team_subscriptions(where: { created_by: { _eq: $id } }) {
      affected_rows
    }
    delete_user_subscriptions(where: { user_id: { _eq: $id } }) {
      affected_rows
    }
    deleteUser(id: $id) {
      id
    }
  }
`;

export async function deleteUser(id: string): Promise<boolean> {
  const response = await GraphQLClient.request<{
    delete_team_subscriptions: { affected_rows: number };
    delete_user_subscriptions: { affected_rows: number };
    deleteUser: { id: string };
  }>(DELETE_USER_DATA, {
    id,
  });

  return response.deleteUser.id === id;
}
