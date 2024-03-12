import { redirect, useNavigate } from '@remix-run/react'
import axios from 'axios'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

export default function UpdateExpensesPage() {
  const navigate = useNavigate()

  const onCloseHandler = () => {
    // navigate programatically
    navigate('..')
  }
  return (
    <Modal onClose={onCloseHandler}>
      <ExpenseForm />
    </Modal>
  )
}

export async function action({ request, params }) {
  const { expenseId } = params

  if (request.method === 'DELETE') {
    axios.delete(`http://localhost:4000/expenses/${expenseId}`)
  }

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const title = String(formData.get('title'))
    const amount = Number(formData.get('amount'))
    const date = new Date(formData.get('date'))

    // validations
    if (amount < 0) {
      return {
        amount: 'Amount should be greater than 0',
      }
    }

    // update an expense
    axios.patch(`http://localhost:4000/expenses/${expenseId}`, {
      title,
      amount,
      date,
      dateAdded: new Date(),
    })
  }

  return redirect('..')
}
