import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    /**
     * Used to Add New Expense
     */
    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/yyy')
        }).returning({ insertedId: Budgets.id });

        setAmount('');
        setName('');
        if (result) {
            setLoading(false)
            refreshData()
            toast('New Expense Added!')
        }
        setLoading(false);
    }
    return (
        <div className="border border-[#E0E0E0] p-5 rounded-lg bg-white shadow-sm">
  <h2 className="font-bold text-lg text-[#333]">Add Expense</h2>

  {/* Поле ввода Названия */}
  <div className="mt-2">
    <h2 className="text-[#666] font-medium my-1">Expense Name</h2>
    <Input
      className="border border-[#E0E0E0] rounded-md p-2 w-full focus:outline-none focus:border-[#1D6F42]"
      placeholder="e.g. Bedroom Decor"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  {/* Поле ввода Суммы */}
  <div className="mt-2">
    <h2 className="text-[#666] font-medium my-1">Expense Amount</h2>
    <Input
      className="border border-[#E0E0E0] rounded-md p-2 w-full focus:outline-none focus:border-[#1D6F42]"
      placeholder="e.g. 1000"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  </div>

  {/* Кнопка добавления */}
  <Button
    disabled={!(name && amount) || loading}
    onClick={() => addNewExpense()}
    className="mt-3 w-full bg-[#1D6F42] text-white font-semibold py-2 rounded-md transition hover:bg-[#4C9A2A] disabled:bg-gray-300"
  >
    {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
  </Button>
</div>

    )
}

export default AddExpense