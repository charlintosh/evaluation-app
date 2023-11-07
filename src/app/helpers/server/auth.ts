export const isUserToken = (token: any): token is { user: { _id: string } } =>
  token && token.user && typeof token.user._id === 'string';
