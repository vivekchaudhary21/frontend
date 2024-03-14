import { redirect, useNavigate } from '@remix-run/react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'

export default function AddExpensesPage() {
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

export async function action({ request }) {
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

  // make a post call to update expenses
  axios.post('http://localhost:4000/expenses', {
    id: uuidv4(),
    title,
    amount,
    date,
    dateAdded: new Date(),
  })
  return redirect('..')
}

export function meta() {
  return [
    {
      charset: 'utf-8',
      title: 'Add an expense',
      viewport: 'width=device-width,initial-scale=1',
    },
  ]
}
