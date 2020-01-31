const CryptoJS = require('crypto-js');


export const environment = {
  production: true,
  apiUrl: 'http://pointters-api-dev3.us-east-1.elasticbeanstalk.com:9000/',
  FACEBOOK_APP_ID: '995599163788797',
  GOOGLE_OAUTH_CLIENT_ID: '926361386983-p1tdfgtip4d0onlm4c0vvl499un5lhog.apps.googleusercontent.com',
  AWSAccessKeyId: 'AKIAIGALHANVPEWURBJA',
  AWSSecretAccessKey: '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',
  AWSBucket: 'pointters_dev/dev',
  AES_KEY: CryptoJS.enc.Base64.parse("bbC2H19lkVbQDfakxcrtNMQdd0FloLyw"),
  AES_IV: CryptoJS.enc.Base64.parse("gqLOHUioQ0QjhuvI"),
  hmr: false,
};
