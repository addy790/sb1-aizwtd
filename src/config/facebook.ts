export const FACEBOOK_CONFIG = {
  appId: '1227211205211043',
  version: 'v19.0',
  scope: [
    'public_profile',
    'email',
    'user_friends',
    'user_posts',
    'user_photos',
    'user_videos'
  ].join(','),
  fields: ['id', 'name', 'email', 'picture', 'friends'],
  loginOptions: {
    auth_type: 'rerequest',
    return_scopes: true
  },
  domains: [
    'graceful-melomakarona-caefc1.netlify.app',
    'localhost'
  ]
};