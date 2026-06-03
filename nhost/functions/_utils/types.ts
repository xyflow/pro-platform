export enum Framework {
  React = 'react',
  Svelte = 'svelte',
  Vue = 'vue',
}

export enum PaidSubscriptionPlan {
  Starter = 'starter',
  Pro = 'pro',
  Enterprise = 'enterprise',
}

export enum FreeSubscriptionPlan {
  Free = 'free',
  Student = 'student',
  OSS = 'oss',
}

export type SubscriptionPlan = PaidSubscriptionPlan | FreeSubscriptionPlan;
