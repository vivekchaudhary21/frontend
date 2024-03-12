import { Link, Outlet, json, useLoaderData } from '@remix-run/react'
import { FaPlus, FaDownload } from 'react-icons/fa'
import axios from 'axios'

import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import ExpensesList from '~/components/expenses/ExpensesList'
import expensesStyles from '~/styles/expenses.css'

export default function ExpensesLayout() {
  const expensesData = useLoaderData()
  return (
    <>
      <ExpensesHeader />
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expensesData} />
      </main>
    </>
  )
}

export async function loader() {
  const { data } = await axios.get('http://localhost:4000/expenses')
  return json(data)
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }]
}
