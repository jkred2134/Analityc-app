import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

function DashboardHeader() {
  const menuList = [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Budgets", path: "/dashboard/budgets" },
    { id: 3, name: "Expenses", path: "/dashboard/expenses" },
  ];

  const path = usePathname();

  return (
    <div className="p-5 shadow-sm border-b border-[#E0E0E0] flex justify-between items-center bg-[#1D6F42]">
    <div className="text-xl font-bold text-white"></div>
  
    {/* Центрированное меню */}
    <div className="flex gap-6 text-lg font-medium text-white">
      {menuList.map((menu) => (
        <Link
          key={menu.id}
          href={menu.path}
          className={`hover:text-[#A0DAB1] transition ${
            path === menu.path ? "text-[#A0DAB1] border-b-2 border-[#A0DAB1] pb-1" : ""
          }`}
        >
          {menu.name}
        </Link>
      ))}
    </div>
  
    {/* Профиль пользователя */}
    <div>
      <UserButton className="text-white hover:text-[#A0DAB1]" afterSignOutUrl="/" />
    </div>
  </div>
  
  );
}

export default DashboardHeader;
