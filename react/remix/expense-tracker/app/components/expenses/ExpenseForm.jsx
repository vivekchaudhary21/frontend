import {
  Form,
  Link,
  useActionData,
  useParams,
  useMatches,
  useNavigation,
} from '@remix-run/react'

function ExpenseForm() {
  const errors = useActionData()
  const { expenseId } = useParams()
  const expenses = useMatches().find(
    (route) => route.id === 'routes/expenses'
  ).data
  const expenseData = expenses.find((data) => data.id === expenseId)
  const navigate = useNavigation()

  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10
  const isSubmitting = navigate.state !== 'idle'

  return (
    <Form
      method={expenseData ? 'patch' : 'post'}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={expenseData?.title || ''}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            // min="0"
            step="0.01"
            required
            defaultValue={expenseData?.amount || ''}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              expenseData?.date ? expenseData.date.slice(0, 10) : ''
            }
          />
        </p>
      </div>
      {errors?.amount && <span>{errors.amount}</span>}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving ...' : 'Save Expense'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  )
}

export default ExpenseForm
