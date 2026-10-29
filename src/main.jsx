import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

// Polices auto-hébergées (sous-ensemble latin uniquement, font-display: swap)
import '@fontsource/montserrat/latin-700.css'
import '@fontsource/montserrat/latin-800.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import './index.css'

import App from './App'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import { StoreProvider } from './hooks/useStore'
import { ContentProvider } from './hooks/useContent'

// Chargé à part : le code de l'admin n'alourdit pas le site public
const Admin = lazy(() => import('./admin/Admin'))

const router = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <Suspense fallback={<div className="min-h-svh bg-navy" />}>
        <Admin />
      </Suspense>
    ),
  },
  { path: '/.admin', element: <Navigate to="/admin" replace /> },
  {
    element: (
      <ContentProvider>
        <App />
      </ContentProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <ComingSoon /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
)
