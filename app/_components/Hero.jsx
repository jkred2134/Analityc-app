import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="flex items-center justify-center h-screen bg-[#f4f4f4]">
  <div className="text-center text-[#333] px-6 py-10 rounded-lg shadow-lg bg-white">
    <h1 className="text-4xl font-bold sm:text-5xl text-[#1D6F42]">
      Analyse Your Budget
      <strong className="block text-[#4C9A2A]">Track Your Expenses</strong>
    </h1>
    <p className="mt-4 text-lg text-[#666]">
      This analytics app will help manage your income and expenses
    </p>
    <div className="mt-8">
      <a
        className="px-6 py-3 text-white bg-[#1D6F42] border-2 border-[#4C9A2A] rounded-lg shadow-md font-semibold hover:bg-[#155E3B] transition"
        href="/dashboard"
      >
        Sign In
      </a>
    </div>
  </div>
</section>


  

  );
}

export default Hero;
