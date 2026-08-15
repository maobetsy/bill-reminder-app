"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import BillForm from "@/components/BillForm";
import BillList from "@/components/BillList";

const normaliseDate = (date) => {
  const d = new Date(date);

  d.setHours(0, 0, 0, 0);

  return d;
};

function pluralise(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function getDueDateStatus(dueDate) {
  const today = normaliseDate(new Date());
  const due = normaliseDate(dueDate);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.round((due - today) / msPerDay);
  
  if (diffInDays === 0) return "Due today";
  if (diffInDays > 0) return `${diffInDays} ${pluralise(diffInDays, "day")} left`;

  const overdueDays = Math.abs(diffInDays);
  return `Overdue by ${overdueDays} ${pluralise(overdueDays, "day")}`;
}

const getBillStatus = (dueDate) => {
  const today = normaliseDate(new Date());
  const due = normaliseDate(dueDate);

  const difference =
    (due - today) / (1000 * 60 * 60 * 24);

  if (difference < 0) {
    return "overdue";
  }

  if (difference <= 3) {
    return "dueSoon";
  }

  return "upcoming";
};

export default function Home() {
  const [bills, setBills] = useState([]);

  const addBill = (bill) => {
    const newBill = {
      id: crypto.randomUUID(),
      ...bill
    };

    setBills((prevBills) => [...prevBills, newBill]);
  };

  const orderedBills = [...bills].sort(
    (a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate)
  );

  const groupedBills = {
    overdue: [],
    dueSoon: [],
    upcoming: [],
  };

  orderedBills.forEach((bill) => {
    const status = getBillStatus(bill.nextDueDate);

    groupedBills[status].push(bill);
  });

  const totalAmount = bills.reduce((sum, bill) => {
    return sum + Number(bill.amount);
   }, 0);

   // TODO:
   // logic for last day of month, business days etc.
   // logic for late payments - separate due date for current schedule and calculate upcoming due date based on last payment date
   const calculateNextDueDate = (date, frequency) => {
      const nextDueDate = new Date(date);

      if (frequency === "weekly") {
        nextDueDate.setDate(nextDueDate.getDate() + 7);
      } else if (frequency === "fortnightly") {
        nextDueDate.setDate(nextDueDate.getDate() + 14);
      } else if (frequency === "monthly") {
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      } else if (frequency === "quarterly") {
        nextDueDate.setMonth(nextDueDate.getMonth() + 3);
      } else if (frequency === "yearly") {
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
      }
      // any other frequency (including "N/A") falls through and returns the same date      

      return nextDueDate.toISOString();
    };

   const markAsPaid = (bill) => {
    const nextDueDate = calculateNextDueDate(
      bill.nextDueDate,
      bill.frequency
    );

    setBills((prevBills) =>
      prevBills.map((b) =>
        b.id === bill.id ? { ...b, nextDueDate } : b
      )
    );
  }

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
    <main className="p-24">
      <Header />
      <BillForm addBill={addBill} />
      <h2 className="text-xl font-semibold p-4 mb-2 bg-red-600 text-white  rounded-lg shadow-md">Overdue</h2>
      <BillList
        bills={groupedBills.overdue}
        onMarkPaid={markAsPaid}
        deleteBill={deleteBill}
        getDueDateStatus={getDueDateStatus}
      />

      <h2 className="text-xl font-semibold p-4 mb-2 bg-orange-600 text-white  rounded-lg shadow-md">Due Soon</h2>
      <BillList
        bills={groupedBills.dueSoon}
        onMarkPaid={markAsPaid}
        deleteBill={deleteBill}
        getDueDateStatus={getDueDateStatus}
      />

      <h2 className="text-xl font-semibold p-4 mb-2 bg-neutral-600 text-white  rounded-lg shadow-md">Upcoming</h2>
      <BillList
        bills={groupedBills.upcoming}
        onMarkPaid={markAsPaid}
        deleteBill={deleteBill}
        getDueDateStatus={getDueDateStatus}
      />
    </main>
  );
}