import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RequireAuth } from '@/app/guards/RequireAuth'
import { RequireGuest } from '@/app/guards/RequireGuest'
import { ROUTES } from '@/config/routes'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { SystemLayout } from '@/layouts/SystemLayout'

const HomePage = lazy(() => import('@/pages/public/HomePage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'))
const RegisterSuccessPage = lazy(() => import('@/pages/auth/RegisterSuccessPage'))
const DashboardPage = lazy(() => import('@/pages/app/DashboardPage'))
const CharactersListPage = lazy(() => import('@/pages/app/CharactersListPage'))
const CharacterDetailsPage = lazy(() => import('@/pages/app/CharacterDetailsPage'))
const CharacterFormPage = lazy(() => import('@/pages/app/CharacterFormPage'))
const ImportHuntPage = lazy(() => import('@/pages/app/ImportHuntPage'))
const MyHuntsPage = lazy(() => import('@/pages/app/MyHuntsPage'))
const HuntDetailsPage = lazy(() => import('@/pages/app/HuntDetailsPage'))
const NotFoundPage = lazy(() => import('@/pages/system/NotFoundPage'))

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: ROUTES.home, element: <HomePage /> }],
  },
  {
    element: <RequireGuest />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.login, element: <LoginPage /> },
          { path: ROUTES.register, element: <RegisterPage /> },
          { path: ROUTES.forgotPassword, element: <ForgotPasswordPage /> },
          { path: ROUTES.resetPassword, element: <ResetPasswordPage /> },
          { path: ROUTES.verifyEmail, element: <VerifyEmailPage /> },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.dashboard, element: <DashboardPage /> },
          { path: ROUTES.characters, element: <CharactersListPage /> },
          { path: ROUTES.characterDetails(':id'), element: <CharacterDetailsPage /> },
          { path: ROUTES.characterNew, element: <CharacterFormPage /> },
          { path: ROUTES.characterEdit(':id'), element: <CharacterFormPage /> },
          { path: ROUTES.importHunt, element: <ImportHuntPage /> },
          { path: ROUTES.myHunts, element: <MyHuntsPage /> },
          { path: ROUTES.huntDetails(':id'), element: <HuntDetailsPage /> },
        ],
      },
    ],
  },
  {
    element: <SystemLayout />,
    children: [{ path: '*', element: <NotFoundPage /> }],
  },
])

// RegisterSuccessPage is used via navigation state after registration
void RegisterSuccessPage

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}