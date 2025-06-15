import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {

  const calculateProgressPerc=()=>{
    // (spend/total)*100
    const perc=(budget.totalSpend/budget.amount)*100;
    return perc>100?100: perc.toFixed(2);
  }
  return (
    
    <Link href={'/dashboard/expenses/'+budget?.id} >
  <div className='p-5 border rounded-lg 
    hover:shadow-md cursor-pointer h-[170px] bg-gray-50'>
    <div className='flex gap-2 items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <h2 className='text-2xl p-3 px-4
          bg-green-100 text-blue-600 rounded-full'>
          {budget?.icon}
        </h2>
        <div>
          <h2 className='font-bold text-gray-800'>{budget.name}</h2>
          <h2 className='text-sm text-gray-500'>{budget.totalItem} Items</h2>
        </div>
      </div>
      <h2 className='font-bold text-lg'  style={{ color: '#1D6F42' }}>${budget.amount}</h2>
    </div>

    <div className='mt-5'>
      <div className='flex items-center justify-between mb-3'>
        <h2 className='text-xs text-gray-400'>
          ${budget.totalSpend ? budget.totalSpend : 0} Spend
        </h2>
        <h2 className='text-xs text-gray-400'>
          ${budget.amount - budget.totalSpend} Remaining
        </h2>
      </div>
      <div className='w-full
        bg-gray-300 h-2 rounded-full'>
        <div className='bg-[#1D6F42] h-2 rounded-full'
          style={{
            width: `${calculateProgressPerc()}%`
          }}>
        </div>
      </div>
    </div>
  </div>
</Link>

  )
}

export default BudgetItem