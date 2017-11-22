export const aggregator = function (endpoint) {
  if (process.env.NODE_ENV === 'production') {
    return `https://aggregator.manager.lush.com${ endpoint }`;
  }
  return `https://beta.aggregator.manager.lush.com${ endpoint }`;
};