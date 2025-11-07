import { redirect } from '@tanstack/react-router'

export const protectedMiddleware = async () => {
  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/signup'
  ) {
    return
  }
  const session = await fetch('/api/auth/session').then((res) => res.json())
  console.log(session)
  if (session) {
    if (session.user) {
      return
    } else {
      throw redirect({ to: '/login' })
    }
  } else {
    throw redirect({ to: '/login' })
  }
}
