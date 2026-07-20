"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import BillForm from "@/components/BillForm";
import BillList from "@/components/BillList";

function pluralise(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function getDaysRemaining(dueDate) {
  // Normalize both dates to midnight to compare just the calendar day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.round((due - today) / msPerDay);
  
  if (diffInDays === 0) return "Due today";
  if (diffInDays > 0) return `${diffInDays} ${pluralise(diffInDays, "day")} left`;

  const overdueDays = Math.abs(diffInDays);
  return `Overdue by ${overdueDays} ${pluralise(overdueDays, "day")}`;
}

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
      <BillList bills={bills} deleteBill={deleteBill} getDaysRemaining={getDaysRemaining} />
      <p>Total Amount: {totalAmount}</p>
    </main>
  );
}