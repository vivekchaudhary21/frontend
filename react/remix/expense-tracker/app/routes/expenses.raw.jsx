// export default function RawExpenses() {
//   return <div>expenses.raw</div>
// }

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 16.99,
    date: new Date().toISOString(),
  },
]

export async function loader() {
  // const response = await fetch('https://icanhazdadjoke.com/', {
  //   headers: {
  //     Accept: 'application/json',
  //   },
  // })
  // const joke = await response.json()
  // console.log(joke)
  // return [...DUMMY_EXPENSES, joke]
  return DUMMY_EXPENSES
}
