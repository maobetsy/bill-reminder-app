import BillItem from "@/features/bills/components/BillItem";
import type { Bill } from "@/types/bill";

interface BillListProps {
    bills: Bill[];
    onMarkPaid: (bill: Bill) => void;
    editingId: string | null;
    onStartEdit: (id: string) => void;
    onSaveEdit: (id: string, updatedFields: Partial<Bill>) => void;
    onCancelEdit: () => void;
    deleteBill: (id: string) => void;
    getDueDateStatus: (dueDate: string) => string;
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-AU");
};

export default function BillList({
    bills,
    onMarkPaid,
    editingId,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    deleteBill,
    getDueDateStatus,
}: BillListProps) {
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