import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expensesList,refreshData}) {

  const deleteExpense=async(expense)=>{
    const result=await db.delete(Expenses)
    .where(eq(Expenses.id,expense.id))
    .returning();

    if(result)
    {
      toast('Expense Deleted!');
      refreshData()
    }
  }
  return (
    <div className="mt-3">
    <h2 className="font-bold text-lg text-[#333]">Latest Expenses</h2>
  
    {/* Заголовки таблицы */}
    <div className="grid grid-cols-4 bg-[#E0E0E0] text-[#333] p-2 mt-3 rounded-md font-semibold">
      <h2>Name</h2>
      <h2>Amount</h2>
      <h2>Date</h2>
      <h2>Action</h2>
    </div>
  
    {/* Данные расходов */}
    {expensesList.map((expenses, index) => (
      <div
        key={index}
        className="grid grid-cols-4 bg-white text-[#555] p-2 border-b border-[#E0E0E0] transition hover:bg-[#F4F4F4]"
      >
        <h2>{expenses.name}</h2>
        <h2 className="font-semibold text-[#1D6F42]">${expenses.amount}</h2>
        <h2>{expenses.createdAt}</h2>
        <h2>
          <Trash
            className="text-red-600 cursor-pointer hover:text-red-800 transition"
            onClick={() => deleteExpense(expenses)}
          />
        </h2>
      </div>
    ))}
  </div>
  
  )
}

export default ExpenseListTable