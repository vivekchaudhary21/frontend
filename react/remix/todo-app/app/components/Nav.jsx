import { Link } from '@remix-run/react'

function Nav() {
  return (
    <nav className="navbar bg-body-tertiary mb-2">
      <div
        className="container-fluid"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Link className="navbar-brand" to="/">
          Todos
        </Link>
      </div>
    </nav>
  )
}

export default Nav
