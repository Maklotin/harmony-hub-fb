import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.VITE_APP_USER_POOL_ID || '', 
      userPoolClientId: process.env.VITE_APP_CLIENT_ID || '',     
    },
  },
});
