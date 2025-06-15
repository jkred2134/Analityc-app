import { DollarSign, ListOrdered, PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

function CardInfo({ budgetList }) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
  
    useEffect(() => {
      if (budgetList) CalculateCardInfo();
    }, [budgetList]);
  
    const CalculateCardInfo = () => {
      let totalBudget_ = 0;
      let totalSpend_ = 0;
  
      budgetList.forEach(element => {
        totalBudget_ = totalBudget_ + Number(element.amount);
        totalSpend_ = totalSpend_ + element.totalSpend;
      });
  
      setTotalBudget(totalBudget_);
      setTotalSpend(totalSpend_);
    };
  
    // Data for the main bar chart
    const mainChartData = [
      {
        name: "Total", 
        totalBudget: totalBudget, 
        totalSpend: totalSpend 
      },
    ];
  
    return (
      <div>
        {/* Budget Info Cards */}
        {budgetList?.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { label: "Total Budget", value: `$${totalBudget}`, Icon: DollarSign, bgColor: 'bg-[#1D6F42]' },
            { label: "Total Spend", value: `$${totalSpend}`, Icon: Wallet, textColor: 'text-red-500', bgColor: 'bg-red-500' },  // Красный фон для Total Spend
            { label: "No. Of Budget", value: budgetList?.length, Icon: ListOrdered, bgColor: 'bg-[#1D6F42]' },
          ].map(({ label, value, Icon, textColor, bgColor }, index) => (
            <div key={index} className="p-7 border border-[#E0E0E0] rounded-lg flex items-center justify-between bg-white shadow-sm">
              <div>
                <h2 className="text-sm text-[#666]">{label}</h2>
                <h2 className={`font-bold text-2xl ${textColor || 'text-[#1D6F42]'}`}>{value}</h2>  
              </div>
              <Icon className={`p-3 h-12 w-12 rounded-full text-white ${bgColor}`} />  {/* Заменили жесткий цвет на динамический */}
            </div>
          ))}
        </div>
        
        ) : (
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        )}
  
        {/* Spacer between charts */}
        <div className="mt-7"></div>
  
        {/* Main Bar Chart for Total Budget and Total Spend */}
        <div className="border border-[#E0E0E0] rounded-lg p-5 bg-white shadow-sm">
          <h2 className="font-bold text-lg text-[#333]">Overall Budget & Spend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mainChartData} margin={{ top: 7 }}>
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
             
              <Bar dataKey="totalBudget" fill="#1D6F42" />
              <Bar dataKey="totalSpend" fill="#E74C3C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default CardInfo;