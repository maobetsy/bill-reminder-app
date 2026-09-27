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
    return "soon";
  }

  return "upcoming";
};

export default function Home() {
  const [bills, setBills] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const addBill = (bill) => {
    const newBill = {
      isPaid: false,
      ...bill,
      id: crypto.randomUUID(),
    };

  setBills((prevBills) => [...prevBills, newBill]);
};

  const orderedBills = [...bills]
    .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate));

  const groupedBills = {
    overdue: [],
    soon: [],
    upcoming: [],
    paid: [],
  };

  const sumAmounts = (list) =>
    list.reduce((sum, bill) => sum + Number(bill.amount), 0);

  orderedBills.forEach((bill) => {
    const status = bill.isPaid ? "paid" : getBillStatus(bill.nextDueDate);
    groupedBills[status].push(bill);
  });

  const totalsByStatus = {
    overdue: sumAmounts(groupedBills.overdue),
    soon: sumAmounts(groupedBills.soon),
    upcoming: sumAmounts(groupedBills.upcoming),
  };

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
    const isOneOff = bill.frequency === "N/A";

    const historyEntry = {
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

  const [editingId, setEditingId] = useState(null);

  const editBill = (id, updatedFields) => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === id ? { ...bill, ...updatedFields } : bill
      )
    );
  };

   const deleteBill = (id) => {
    setBills((prevBills) => prevBills.filter(bill => bill.id !== id));
  }

const deletePaymentHistoryEntry = (id) => {
  setPaymentHistory((prev) => prev.filter((entry) => entry.id !== id));
};

  useEffect(() => {
    const storedBills = localStorage.getItem("bills");
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("paymentHistory");
    if (storedHistory) {
      setPaymentHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));
  }, [paymentHistory]);  

  return (
    <main className="p-24">
      <Header />
      <BillForm addBill={addBill} />
      <h2 className="text-xl font-semibold p-4 mb-2 bg-red-600 text-white  rounded-lg shadow-md">Overdue</h2>
      <div className="p-4">
        <p className="text-sm text-neutral-500">Total amount due</p>
        <p className="text-2xl font-bold text-red-600">
          ${totalsByStatus.overdue.toFixed(2)}
        </p>
      </div>
      <BillList
        bills={groupedBills.overdue}
        onMarkPaid={markAsPaid}
        editingId={editingId}
        onStartEdit={setEditingId}
        onSaveEdit={editBill}
        onCancelEdit={() => setEditingId(null)}
        deleteBill={deleteBill}
        getDueDateStatus={getDueDateStatus}
      />

      <h2 className="text-xl font-semibold p-4 mb-2 bg-orange-600 text-white  rounded-lg shadow-md">Soon</h2>
      <div className="p-4">
        <p className="text-sm text-neutral-500">Total amount due</p>
        <p className="text-2xl font-bold text-orange-600">
          ${totalsByStatus.soon.toFixed(2)}
        </p>
      </div>
      <BillList
        bills={groupedBills.soon}
        onMarkPaid={markAsPaid}
                editingId={editingId}
        onStartEdit={setEditingId}
        onSaveEdit={editBill}
        onCancelEdit={() => setEditingId(null)}
        deleteBill={deleteBill}
        getDueDateStatus={getDueDateStatus}
      />

      <h2 className="text-xl font-semibold p-4 mb-2 bg-neutral-600 text-white  rounded-lg shadow-md">Upcoming</h2>
      <div className="p-4">
        <p className="text-sm text-neutral-500">Total amount due</p>
        <p className="text-2xl font-bold text-neutral-600">
          ${totalsByStatus.upcoming.toFixed(2)}
        </p>
      </div>
      <BillList
        bills={groupedBills.upcoming}
        onMarkPaid={markAsPaid}
                editingId={editingId}
        onStartEdit={setEditingId}
        onSaveEdit={editBill}
        onCancelEdit={() => setEditingId(null)}
        deleteBill={deleteBill}
        getDueDateStatus={getDueDateStatus}
      />

      <h2 className="text-xl font-semibold p-4 mb-2 bg-green-600 text-white rounded-lg shadow-md">
        Paid
      </h2>
      <ul>
        {paymentHistory.map((entry) => (
          <li key={entry.id} className="p-3 border-b flex items-center justify-between">
            <div>
              {entry.name} — ${Number(entry.amount).toFixed(2)}
              {entry.dueDate && (
                <span className="block text-sm text-neutral-500">
                  This bill was due on {new Date(entry.dueDate).toLocaleDateString("en-AU")}.
                </span>
              )}
            </div>
            <button
              onClick={() => deletePaymentHistoryEntry(entry.id)}
              className="text-sm text-red-600 hover:text-red-800 ml-4"
              aria-label={`Delete payment record for ${entry.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}