export const getEnvironment = () => ({
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  domain: window.location.origin,
  fbAppId: import.meta.env.VITE_FB_APP_ID
});