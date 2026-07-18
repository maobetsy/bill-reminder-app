"use client";

import { useState } from "react";

import Header from "@/components/Header";
import BillForm from "@/components/BillForm";
import BillList from "@/components/BillList";

export default function Home() {
  const [bills, setBills] = useState([]);

  const addBill = (bill) => {
    const newBill = {
      id: crypto.randomUUID(),
      ...bill
    };

    setBills([...bills, newBill]);
  };

  const totalAmount = bills.reduce((sum, bill) => {
    return sum + Number(bill.amount);
   }, 0);

  return (
    <main>
      <Header />
      <BillForm addBill={addBill} />
      <BillList bills={bills}/>
      <p>Total Amount: {totalAmount}</p>
    </main>
  );
}