"use client";

import { useState, type SubmitEvent } from "react";

import type { Bill, Frequency } from "@/features/bills/types";

import Button from "@/components/Button";

interface BillFormProps {
    addBill: (bill: Omit<Bill, "id" | "isPaid">) => void;
}

export default function BillForm({ addBill }: BillFormProps) {
    const [billName, setBillName] = useState("");
    const [amount, setAmount] = useState("");
    const [frequency, setFrequency] = useState<Frequency | "">("");
    const [nextDueDate, setNextDueDate] = useState("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (billName && amount && frequency && nextDueDate) {
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
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border rounded-md"
                required
            />
            <input
                type="date"
                placeholder="Next Due Date"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                className="p-2 border rounded-md"
                required
            />
            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency | "")}
                className="p-2 border rounded-md"
                required
            >
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="N/A">N/A</option>
            </select>
            <Button type="submit" variant="accent">
                Add Bill
            </Button>
        </form>
    )
}