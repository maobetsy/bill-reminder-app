"use client";

import { useState } from "react";

export default function BillForm({ addBill }) {
    const [billName, setBillName] = useState("");
    const [amount, setAmount] = useState("");
    const [frequency, setFrequency] = useState("");
    const [nextDueDate, setNextDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (billName && amount && frequency) {
            addBill({ 
                name: billName, 
                amount: parseFloat(amount), 
                frequency: frequency,
                nextDueDate: nextDueDate
            });

            setBillName("");
            setAmount("");
            setFrequency("");
            setNextDueDate("");
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 p-4 mb-6 bg-neutral-100 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Bill name"
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
                className="p-2 border rounded-md"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border rounded-md"
            />
            <input
                type="date"
                placeholder="Next Due Date"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                className="p-2 border rounded-md"
            />
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="p-2 border rounded-md">
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="yearly">N/A</option>
            </select>
            <button type="submit" className="p-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700">
                Add Bill
            </button>
        </form>
    )
}