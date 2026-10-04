import { useState } from "react";

import Button from "@/components/Button";

function BillItem({ bill, isEditing, onStartEdit, onSaveEdit, onCancelEdit, onMarkPaid, deleteBill, formatDate, getDueDateStatus }) {
    const [draft, setDraft] = useState(bill);

    if (isEditing) {
        return (
            <li className="my-2 p-4 border rounded-lg shadow-sm bg-white">
                <input
                    className="block w-full mb-2 p-1 border rounded"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
                <input
                    type="number"
                    className="block w-full mb-2 p-1 border rounded"
                    value={draft.amount}
                    onChange={(e) => setDraft({ ...draft, amount: Number(e.target.value) })}
                />
                <div className="mt-2 flex gap-2">
                    <Button onClick={() => { onSaveEdit(bill.id, draft); onCancelEdit(); }}>
                        Save
                    </Button>
                    <Button variant="neutral" onClick={onCancelEdit}>
                            Cancel
                    </Button>
                </div>
            </li>
        );
    }

    return (
        <li className="my-2 p-4 border rounded-lg shadow-sm bg-white">
            <span className="block font-semibold">{bill.name} - ${bill.amount}</span>
            <span className="block text-sm text-gray-600">
                Due Date: {formatDate(bill.nextDueDate)} ({getDueDateStatus(bill.nextDueDate)})
            </span>

            <div className="mt-2 flex gap-2">
                <Button variant="success" onClick={() => onMarkPaid(bill)}>
                    Mark Paid
                </Button>
                <Button onClick={() => onStartEdit(bill.id)}>
                    Edit
                </Button>
                <Button variant="danger" onClick={() => deleteBill(bill.id)}>
                    Delete
                </Button>
            </div>
        </li>
    );
}

export default function BillList({ bills, onMarkPaid, editingId, onStartEdit, onSaveEdit, onCancelEdit, deleteBill, getDueDateStatus }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-AU");
    };

    return (
        <div className="py-2 px-4 mb-6 bg-neutral-100 rounded-lg shadow-md">
            {bills.length === 0 ? (
                <p className="p-4">No bills yet.</p>
            ) : (
                <ul>
                    {bills.map((bill) => (
                        <BillItem
                            key={bill.id}
                            bill={bill}
                            isEditing={bill.id === editingId}
                            onStartEdit={onStartEdit}
                            onSaveEdit={onSaveEdit}
                            onCancelEdit={onCancelEdit}
                            onMarkPaid={onMarkPaid}
                            deleteBill={deleteBill}
                            formatDate={formatDate}
                            getDueDateStatus={getDueDateStatus}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}