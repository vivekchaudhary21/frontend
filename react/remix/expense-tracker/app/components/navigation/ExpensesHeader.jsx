/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink, useNavigate } from '@remix-run/react'

function ExpensesHeader() {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/')
  }
  return (
    <header id="main-header">
      <h1 id="logo" onClick={onClick} style={{ cursor: 'pointer' }}>
        RemixExpenses
      </h1>
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <button className="cta">Logout</button>
      </nav>
    </header>
  )
}

export default ExpensesHeader
