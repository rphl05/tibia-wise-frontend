export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',

  dashboard: '/dashboard',
  hunts: '/hunts',
  huntDetails: (id: string) => `/hunts/${id}`,
  myHunts: '/my-hunts',
  importHunt: '/hunts/import',

  characters: '/characters',
  characterDetails: (id: string) => `/characters/${id}`,

  statistics: '/statistics',
  recommendations: '/recommendations',
  rankings: '/rankings',

  news: '/news',
  newsDetails: (id: string) => `/news/${id}`,
  tutorials: '/tutorials',
  faq: '/faq',
  support: '/support',
  premium: '/premium',

  profile: '/profile',
  notifications: '/notifications',
  settings: '/settings',

  terms: '/terms',
  privacy: '/privacy',

  forbidden: '/403',
  notFound: '/404',
  serverError: '/500',
  maintenance: '/503',
} as const
