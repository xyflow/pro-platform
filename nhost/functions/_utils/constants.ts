export const MAILJET_PUBLIC_MAILING_LIST_ID = 105980;
export const MAILJET_PRO_MAILING_LIST_ID = 96936;
export const MAILJET_PUBLIC_NEWSLETTER_CONFIRM_TEMPLATE_ID = 4288745;
export const MAILJET_WELCOME_MAIL_TEMPLATE_IDS = {
  starter: 4265635,
  pro: 4265536,
  default: 3968683,
};

export const IS_DEVELOPMENT = process.env.NHOST_SUBDOMAIN === 'local';
export const IS_PRODUCTION = process.env.NHOST_SUBDOMAIN !== 'local';
export const IS_STAGING = process.env.NHOST_SUBDOMAIN === 'qatudfhrsubqcehhdsgx';
