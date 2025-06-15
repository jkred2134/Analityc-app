"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
function EditBudget({budgetInfo,refreshData}) {
    const [emojiIcon,setEmojiIcon]=useState(budgetInfo?.icon);
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);

    const [name,setName]=useState();
    const [amount,setAmount]=useState();

    const {user}=useUser();

    useEffect(()=>{
        if(budgetInfo)
        {
            setEmojiIcon(budgetInfo?.icon)
            setAmount(budgetInfo.amount);
            setName(budgetInfo.name)

        }
    },[budgetInfo])
    const onUpdateBudget=async()=>{
        const result=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result)
        {
            refreshData()
            toast('Budget Updated!')
        }
    }
  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 bg-[#1D6F42] text-white font-medium py-2 px-4 rounded-md transition hover:bg-[#4C9A2A]">
          <PenBox /> Edit
        </Button>
      </DialogTrigger>
  
      <DialogContent className="bg-white border border-[#E0E0E0] shadow-lg rounded-lg p-5">
        <DialogHeader>
          <DialogTitle className="text-[#333] font-bold text-xl">Update Budget</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              {/* Выбор эмодзи */}
              <Button
                variant="outline"
                className="text-lg border border-[#E0E0E0] text-[#333] bg-white rounded-md p-2"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
  
              {/* Эмодзи-пикер */}
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
  
              {/* Поле ввода имени бюджета */}
              <div className="mt-2">
                <h2 className="text-[#666] font-medium my-1">Budget Name</h2>
                <Input
                  className="border border-[#E0E0E0] rounded-md p-2 w-full focus:outline-none focus:border-[#1D6F42]"
                  placeholder="e.g. Home Decor"
                  defaultValue={budgetInfo?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              {/* Поле ввода суммы бюджета */}
              <div className="mt-2">
                <h2 className="text-[#666] font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  className="border border-[#E0E0E0] rounded-md p-2 w-full focus:outline-none focus:border-[#1D6F42]"
                  placeholder="e.g. 5000$"
                  defaultValue={budgetInfo?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
  
        {/* Кнопки */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={() => onUpdateBudget()}
              className="mt-5 w-full bg-[#1D6F42] text-white font-semibold py-2 rounded-md transition hover:bg-[#4C9A2A] disabled:bg-gray-300"
            >
              Update Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  
  )
}

export default EditBudget