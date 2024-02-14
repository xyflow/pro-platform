export enum SubscriptionPlan {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
  STUDENT = 'student',
  OSS = 'oss',
}

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum Framework {
  REACT = 'react',
}

export type ProExampleVariant = {
  id: string;
  label: string;
};

export type ProExampleConfig = {
  id: string;
  name?: string;
  description?: string;
  framework: string;
  hidden?: boolean;
  variants?: ProExampleVariant[];
  thumbnail?: string;
  preview: string;
  local?: boolean;
  free?: boolean;
};

export type GithubFile = { name: string; content: string; path: string };
