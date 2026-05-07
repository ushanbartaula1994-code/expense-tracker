import { useEffect, useState } from "react";
import type {Expense} from '../type/expense' 
import ExpensesList from "./ExpensesList";

const ExpenseTracker = () => {
    const[title,setTitle]=useState<string>("")
    const [amount,setAmount]=useState<string>("")
    const[select ,setSelect]=useState("food")
    const [expenses,setExpenses]=useState<Expense[]>(()=>{
        const stored =localStorage.getItem('expenses')
        return stored ? JSON.parse(stored) :[]
    })
    useEffect(()=>{
    localStorage.setItem('expenses',JSON.stringify(expenses))
    
    },[expenses])
    
    const handleSubmit=(e:React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        if(!title || !amount.trim()) return
        const newExpenses ={
            id:Date.now(),
            title:title,
            amount:Number(amount),
            category:select,
        }
        setExpenses([...expenses ,newExpenses])
        
        setTitle('')
        setAmount('')
        setSelect('')

    }
    const handleDelete=(id:number)=>{
setExpenses(expenses.filter((expense)=>expense.id !== id))
    }

    const totalExpense =expenses.reduce((sum,expense)=>{
    return sum + expense.amount
    },0)

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-500 to-blue-300 p-5">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
           <div className="mb-6 p-4 bg-blue-50 rounded-xl shadow-sm text-center">
  <h2 className="text-sm font-medium text-gray-600">
    Total Expense
  </h2>

  <p className="text-2xl font-bold text-blue-600">
    Rs {totalExpense}
  </p>
</div>
            <form onSubmit={handleSubmit}
             className="flex flex-col gap-2 mb-4"> 
               
                <input className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text" placeholder="Expense title" />
                <input  
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                 className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="number" placeholder="Amount" />
                <select
                value={select}
                onChange={(e)=>setSelect(e.target.value)}
                 className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ">
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="shopping">Shopping</option>
                </select>
                <button className="bg-blue-500 text-white p-2 w-full cursor-pointer rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out hover:scale-[1.02]">Add Expense</button>
            </form>
            <ExpensesList
             expenses={expenses}
             handleDelete={handleDelete}
               />
        </div>
        
    </div>
  )
}

export default ExpenseTracker
