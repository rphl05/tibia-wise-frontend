export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
  appName: import.meta.env.VITE_APP_NAME ?? 'Tibia Wise',
  isDev: import.meta.env.DEV,
} as const
