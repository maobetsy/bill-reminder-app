"use client";

import type { Bill, BillStatus, PaymentRecord } from "@/types/bill";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateNextDueDate } from "@/utils/dates";
import { getBillStatus, sumAmounts } from "@/utils/bills";

import Header from "@/components/Header";
import BillForm from "@/features/bills/components/BillForm";
import BillSection from "@/features/bills/components/BillSection";
import PaymentHistory from "@/features/bills/components/PaymentHistory";
import CollapsibleBillSection from "@/features/bills/components/CollapsibleBillSection";

const SECTIONS: {
  status: "overdue" | "soon" | "upcoming";
  title: string;
  headerClass: string;
  totalClass: string;
}[] = [
  { status: "overdue", title: "Overdue", headerClass: "bg-red-600", totalClass: "text-red-600" },
  { status: "soon", title: "Soon", headerClass: "bg-orange-600", totalClass: "text-orange-600" },
  { status: "upcoming", title: "Upcoming", headerClass: "bg-neutral-600", totalClass: "text-neutral-600" },
];

export default function Home() {
  // const [bills, setBills] = useState<Bill[]>([]);
  // const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [bills, setBills] = useLocalStorage<Bill[]>("bills", []);
  const [paymentHistory, setPaymentHistory] = useLocalStorage<PaymentRecord[]>("paymentHistory", []);


  // const [showLater, setShowLater] = useState(false);

  const addBill = (bill: Omit<Bill, "id" | "isPaid">) => {
    const newBill: Bill = {
      ...bill,
      isPaid: false,
      id: crypto.randomUUID(),
    };

    setBills((prevBills) => [...prevBills, newBill]);
  };

  const orderedBills = [...bills].sort(
    (a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime()
  );

  const groupedBills: Record<BillStatus, Bill[]> = {
    overdue: [],
    soon: [],
    upcoming: [],
    later: [],
    paid: [],
  };

  orderedBills.forEach((bill) => {
    const status = bill.isPaid ? "paid" : getBillStatus(bill.nextDueDate);
    groupedBills[status].push(bill);
  });

  const totalsByStatus = {
    overdue: sumAmounts(groupedBills.overdue),
    soon: sumAmounts(groupedBills.soon),
    upcoming: sumAmounts(groupedBills.upcoming),
    later: sumAmounts(groupedBills.later),
  };

  const markAsPaid = (bill: Bill) => {
    const isOneOff = bill.frequency === "N/A";

    const historyEntry: PaymentRecord = {
      id: crypto.randomUUID(),
      billId: bill.id,
      name: bill.name,
      amount: bill.amount,
      paidDate: new Date().toISOString(),
      dueDate: bill.nextDueDate,
    };
    setPaymentHistory((prev) => [historyEntry, ...prev]);

    setBills((prevBills) =>
      prevBills.map((b) => {
        if (b.id !== bill.id) return b;

        if (isOneOff) {
          return { ...b, isPaid: true };
        }

        return {
          ...b,
          nextDueDate: calculateNextDueDate(b.nextDueDate, b.frequency),
        };
      })
    );
  };

  const [editingId, setEditingId] = useState<string | null>(null);

  const editBill = (id: string, updatedFields: Partial<Bill>) => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === id ? { ...bill, ...updatedFields } : bill
      )
    );
  };

  const saveEdit = (id: string, updatedFields: Partial<Bill>) => {
    editBill(id, updatedFields);
    setEditingId(null);
  };

  const deleteBill = (id: string) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  const deletePaymentHistoryEntry = (id: string) => {
    setPaymentHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const listProps = {
    editingId,
    onMarkPaid: markAsPaid,
    onStartEdit: setEditingId,
    onSave: saveEdit,
    onCancel: () => setEditingId(null),
    onDelete: deleteBill,
  };

  // useEffect(() => {
  //   const storedBills = localStorage.getItem("bills");
  //   if (storedBills) {
  //     setBills(JSON.parse(storedBills) as Bill[]);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("bills", JSON.stringify(bills));
  // }, [bills]);

  // useEffect(() => {
  //   const storedHistory = localStorage.getItem("paymentHistory");
  //   if (storedHistory) {
  //     setPaymentHistory(JSON.parse(storedHistory) as PaymentRecord[]);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));
  // }, [paymentHistory]);  

  return (
    <main className="p-24">
      <Header />
      <BillForm addBill={addBill} />

      {SECTIONS.map(({ status, ...style }) => (
        <BillSection
          key={status}
          bills={groupedBills[status]}
          total={totalsByStatus[status]}
          {...style}
          {...listProps}
        />
      ))}

      <PaymentHistory entries={paymentHistory} onDelete={deletePaymentHistoryEntry} />

      <CollapsibleBillSection
        title="Later"
        bills={groupedBills.later}
        total={totalsByStatus.later}
        {...listProps}
      />
    </main>
  );
}
