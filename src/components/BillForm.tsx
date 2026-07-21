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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Bill name"
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="date"
                placeholder="Next Due Date"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
            />
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
            <button type="submit">Add Bill</button>
        </form>
    )
}