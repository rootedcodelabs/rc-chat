import { createFileRoute, redirect } from '@tanstack/react-router'
import { protectedMiddleware } from '@/lib/utils/protected.middleware'

export const Route = createFileRoute('/logout')({
  beforeLoad: async () => {
    await protectedMiddleware()
    await fetch('/api/auth/logout', { method: 'POST' })
    throw redirect({
      to: '/login',
      replace: true,
    })
  },
  component: LogOutPage,
})

function LogOutPage() {
  return <></>
}
