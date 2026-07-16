"use client";

import { useState } from "react";

import Header from "@/components/Header";
import BillForm from "@/components/BillForm";
import BillList from "@/components/BillList";

export default function Home() {
  const [bills, setBills] = useState([]); 

  return (
    <main>
      <Header />
      <BillForm />
      <BillList bills={bills}/>
    </main>
  );
}