import type { PaymentRecord } from "@/types/bill";
import { formatDate } from "@/utils/format";

interface PaymentHistoryProps {
    entries: PaymentRecord[];
    onDelete: (id: string) => void;
}

export default function PaymentHistory({ entries, onDelete }: PaymentHistoryProps) {
    return (
        <>
            <h2 className="text-xl font-semibold p-4 mb-2 bg-green-600 text-white rounded-lg shadow-md">
                Paid
            </h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id} className="p-3 border-b flex items-center justify-between">
                        <div>
                            {entry.name} — ${Number(entry.amount).toFixed(2)}
                            {entry.dueDate && (
                                <span className="block text-sm text-neutral-500">
                                    This bill was due on {formatDate(entry.dueDate)}.
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => onDelete(entry.id)}
                            className="text-sm text-red-600 hover:text-red-800 ml-4"
                            aria-label={`Delete payment record for ${entry.name}`}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}