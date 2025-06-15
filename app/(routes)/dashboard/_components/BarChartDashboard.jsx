import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className="border border-[#E0E0E0] rounded-lg p-5 bg-white shadow-sm">
    <h2 className="font-bold text-lg text-[#333]">Activity</h2>
    <ResponsiveContainer width={'80%'} height={300}>
      <BarChart data={budgetList} margin={{ top: 7 }}>
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#1D6F42" />
        <Bar dataKey="amount" stackId="a" fill="#A0DAB1" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  
  )
}

export default BarChartDashboard