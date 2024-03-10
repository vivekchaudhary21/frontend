import { useNavigate } from '@remix-run/react'

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
