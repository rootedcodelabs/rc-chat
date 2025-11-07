import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/signup')({
  beforeLoad: async () => {
    const session = await fetch('/api/auth/session').then((res) => res.json())
    console.log(session)
    if (session) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: SignUpPage,
})

function SignUpPage() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (user) => {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (!response.ok) {
        throw new Error('Failed to login')
      }
      return response.json()
    },
    onSuccess: (data) => {
      // Invalidate queries to refetch data after successful mutation
      queryClient.invalidateQueries({ queryKey: ['user'] })
      console.log('Signed up successfully:', data.user)
    },
    onError: (err) => {
      console.error('Error signing up:', err.message)
    },
  })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    } as unknown as void
    mutate(user)
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <label htmlFor="email">Name:</label>
        <input
          className="border border-gray-300 rounded px-2 py-1"
          type="text"
          id="name"
          name="name"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          className="border border-gray-300 rounded px-2 py-1"
          type="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="border border-gray-300 rounded px-2 py-1"
          type="password"
          id="password"
          name="password"
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
          disabled={isPending}
        >
          Sign Up
        </button>
        {isSuccess && <p className="text-green-500">Signed up successfully!</p>}
        {isError && <p className="text-red-500">Sign up failed!</p>}
      </form>
      <p>
        Already have an account?{' '}
        <Link className="font-bold underline" to="/login">
          Log in
        </Link>
      </p>
    </div>
  )
}
