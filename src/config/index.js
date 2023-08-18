export const configData = {
  server_url: 'https://localhost:5000',
  dynamoDB: {
    // signatureVersion: 'v4',
    accessKeyId: '856484340557',
    secretAccessKey: '348249e0afbf50676a1437c38a4afde7c0a9bc0b85138f9fe4837f169607c06c',
    sessionToken: 'arn:aws:dynamodb:eu-north-1:856484340557:table/reward_service',
    region: 'us-east-1',
  },
  lambda: {
    getServices: 'https://x5e47dtts4sa642mxavqfd7zhm0apgng.lambda-url.us-east-1.on.aws/',
    addRequest: 'https://d2di7frwmq4xqebuhupxwc2ccy0mihzv.lambda-url.us-east-1.on.aws/',
    // endpoint:'https://a6g8d6a42i.execute-api.us-east-1.amazonaws.com/default/api_getway'
    endpoint: 'https://cwlhzd8lqf.execute-api.us-east-2.amazonaws.com/stage-1', // /customer
  },
};
