export const environment = {
  production: true,
  apiHost: 'https://api.s-zone.uz/v1',
  tokenName: 'currentUser',
  customDateTimeFormat: {
    apiFormat: 'YYYY-MM-DD HH:mm:ss',
    parseInput: 'YYYY-MM-DD HH:mm',
    fullPickerInput: 'YYYY-MM-DD HH:mm',
    datePickerInput: 'YYYY-MM-DD',
    timePickerInput: 'HH:mm:ss',
    monthYearLabel: 'YYYY-MM',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MM',
  }
};

// export const environment = {
//   production: true,
//   cognitoSettings: {
//     UserPoolId: 'us-east-1_aZQ8f8cVM',
//     ClientId: '64rkm79q02m36rrmc3a0pn51q6',
//   },
//   awsConfig: {
//     region: 'us-east-1',
//     accessKeyId: 'AKIAJE3KS5E7SY6ZCG5A',
//     secretAccessKey: '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'
//   },
// };