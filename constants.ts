export const SLACK_AUTHORIZE_URL = 'https://slack.com/oauth/v2/authorize';
export const SLACK_ACCESS_URL = 'https://slack.com/api/oauth.v2.access'

export const SLACK_AUTHORIZE_REDIRECT_URI = 'http://localhost:3000/auth-redirect';
export const SLACK_ACCESS_REDIRECT_URI = 'http://localhost:3000/auth-redirect';

export const SLACK_USER_SCOPES = [
  'incoming-webhook',
];
