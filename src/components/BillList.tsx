import { useState } from "react";

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
                    <button
                        onClick={() => { onSaveEdit(bill.id, draft); onCancelEdit(); }}
                        className="p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={onCancelEdit}
                        className="p-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
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
                <button onClick={() => onMarkPaid(bill)} className="p-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                    Mark Paid
                </button>
                <button onClick={() => onStartEdit(bill.id)} className="p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Edit
                </button>
                <button onClick={() => deleteBill(bill.id)} className="p-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                    Delete
                </button>
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