export const MAILJET_PUBLIC_MAILING_LIST_ID = 105980;
export const MAILJET_PRO_MAILING_LIST_ID = 96936;
export const MAILJET_PUBLIC_NEWSLETTER_CONFIRM_TEMPLATE_ID = 4288745;

export const MAILJET_TEAM_INVITE_TEMPLATE_IDS = {
  react: 5364667,
  svelte: 8078960,
  vue: 5364667,
  default: 5364667,
};

export const MAILJET_WELCOME_MAIL_TEMPLATE_IDS = {
  react: 8078808,
  svelte: 8078874,
  vue: 8078809,
  default: 8078808,
};

export const FRAMEWORK_NAMES = {
  react: 'React',
  svelte: 'Svelte',
  vue: 'Vue',
};

export const IS_DEVELOPMENT = process.env.NHOST_SUBDOMAIN === 'local';
export const IS_PRODUCTION = process.env.NHOST_SUBDOMAIN !== 'local';
export const IS_STAGING = process.env.NHOST_SUBDOMAIN === 'qatudfhrsubqcehhdsgx';
