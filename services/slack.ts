import * as qs from 'querystring';

import {
  SLACK_AUTHORIZE_URL,
  SLACK_AUTHORIZE_REDIRECT_URI,
  SLACK_USER_SCOPES,
  SLACK_ACCESS_URL,
  SLACK_ACCESS_REDIRECT_URI,
} from '../constants';
import { clientId, clientSecret } from '../secrets';

const queryEncodedParams = qs.stringify({
  scope: SLACK_USER_SCOPES,
  client_id: clientId,
  redirect_uri: SLACK_AUTHORIZE_REDIRECT_URI,
});

export const slackUrl = `${SLACK_AUTHORIZE_URL}?${queryEncodedParams}`;

export const callAccessAPI = async (verifierCode: string) => {
  const accessQueryEncodedParams = qs.stringify({
    code: verifierCode,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: SLACK_ACCESS_REDIRECT_URI,
  })

  const slackAccessUrl = `${SLACK_ACCESS_URL}?${accessQueryEncodedParams}`;

  try {
    const response = await fetch(
      slackAccessUrl,
      { method: 'POST' }
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
