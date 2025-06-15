"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';

function ExpensesScreen({params}) {
    const {user}=useUser();
    const [budgetInfo,setbudgetInfo]=useState();
    const [expensesList,setExpensesList]=useState([]);
    const route=useRouter();
    useEffect(()=>{
        
        user&&getBudgetInfo();
       
    },[user]);

    /**
     * Get Budget Information
     */
    const getBudgetInfo=async()=>{
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)

          setbudgetInfo(result[0]);
          getExpensesList();
    }

    /**
     * Get Latest Expenses
     */
    const getExpensesList=async()=>{
      const result=await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result)
    }

    /**
     * Used to Delete budget
     */
    const deleteBudget=async()=>{

      const deleteExpenseResult=await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning()

      if(deleteExpenseResult)
      {
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
      }
      toast('Budget Deleted !');
      route.replace('/dashboard/budgets');
  

  
    }
   
  return (
    <div className="p-10">
  {/* Заголовок */}
  <h2 className="text-2xl font-bold flex justify-between items-center text-[#333]">
    <span className="flex gap-2 items-center">
      <ArrowLeft onClick={() => route.back()} className="cursor-pointer text-[#1D6F42] hover:text-[#14532D] transition" />
      My Expenses
    </span>

    {/* Кнопки редактирования и удаления */}
    <div className="flex gap-3 items-center">
      <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />

      {/* Удаление бюджета */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="flex gap-2 bg-red-600 text-white hover:bg-red-700 transition">
            <Trash /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white shadow-md rounded-lg border border-[#E0E0E0]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#333]">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#555]">
              This action cannot be undone. This will permanently delete your current budget along with expenses
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-[#E0E0E0] text-[#333]">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteBudget()} className="bg-red-600 text-white hover:bg-red-700 transition">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </h2>

  {/* Блок с бюджетом и добавлением расходов */}
  <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
    {budgetInfo ? (
      <BudgetItem budget={budgetInfo} />
    ) : (
      <div className="h-[150px] w-full bg-[#E0E0E0] rounded-lg animate-pulse"></div>
    )}
    <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo()} />
  </div>

  {/* Таблица расходов */}
  <div className="mt-4">
    <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
  </div>
</div>

  )
}

export default ExpensesScreen