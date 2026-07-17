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

  return (
    <main>
      <Header />
      <BillForm addBill={addBill} />
      <BillList bills={bills}/>
    </main>
  );
}