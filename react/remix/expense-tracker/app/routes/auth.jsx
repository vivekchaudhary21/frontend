import AuthForm from '../components/auth/AuthForm'
import authStyles from '~/styles/auth.css'

export default function Auth() {
  return <AuthForm />
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: authStyles,
    },
  ]
}
