import type{Expense} from '../type/expense'
interface ExpensesListProps{
    expenses:Expense[],
    handleDelete:(id:number)=>void
  }

const ExpensesList = ({expenses,handleDelete}:ExpensesListProps) => {
    // console.log(expenses)
  return (
    <div>
      {expenses.map((expense)=>(
        <div key={expense.id}
        className="flex justify-between items-center p-3 mb-2 bg-gray-100 rounded-lg shadow-sm"
        >
            
       <h3>{expense.title}</h3>
       <h3>{expense.amount}</h3>
       <h3>{expense.category}</h3>
       <button
       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
        onClick={()=>handleDelete(expense.id)}>Delete</button>

</div>

      )

      )}
    </div>
  )
}

export default ExpensesList
