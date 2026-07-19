"use client";

import { useEffect, useState } from "react";

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

   const deleteBill = (id) => {
    setBills((prevBills) => prevBills.filter(bill => bill.id !== id));
  }

  useEffect(() => {
    const storedBills = localStorage.getItem("bills");
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  return (
    <main>
      <Header />
      <BillForm addBill={addBill} />
      <BillList bills={bills} deleteBill={deleteBill} />
      <p>Total Amount: {totalAmount}</p>
    </main>
  );
}