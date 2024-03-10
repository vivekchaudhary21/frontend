import { Link, useSearchParams } from '@remix-run/react'
import { FaLock, FaUserPlus } from 'react-icons/fa'

function AuthForm() {
  const [searchParams] = useSearchParams()
  const authMode = searchParams.get('mode')

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'signup' ? <FaUserPlus /> : <FaLock />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button>{authMode === 'signup' ? 'SignUp' : 'Login'}</button>
        {authMode === 'signup' ? (
          <Link to="?mode=login">Log in with existing user</Link>
        ) : (
          <Link to="?mode=signup">New User. Sign up here </Link>
        )}
      </div>
    </form>
  )
}

export default AuthForm
