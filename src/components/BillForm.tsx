"use client";

import { useState } from "react";

export default function BillForm({ addBill }) {
    const [billName, setBillName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (billName && amount) {
            addBill({ name: billName, amount: parseFloat(amount) });
            setBillName("");
            setAmount("");
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
            <button type="submit">Add Bill</button>
        </form>
    )
}