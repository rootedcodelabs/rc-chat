import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/logout')({
  beforeLoad: async () => {
    const session = await fetch('/api/auth/session').then((res) => res.json())
    if (session) {
      await fetch('/api/auth/logout', { method: 'POST' })
    }
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
