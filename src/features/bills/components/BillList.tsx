import BillItem from "@/features/bills/components/BillItem";
import type { Bill } from "@/types/bill";

interface BillListProps {
    bills: Bill[];
    editingId: string | null;
    onMarkPaid: (bill: Bill) => void;
    onStartEdit: (id: string) => void;
    onSave: (id: string, updatedFields: Partial<Bill>) => void;
    onCancel: () => void;
    onDelete: (id: string) => void;
}

export default function BillList({
    bills,
    editingId,
    onMarkPaid,
    onStartEdit,
    onSave,
    onCancel,
    onDelete,
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
                            onSave={onSave}
                            onCancel={onCancel}
                            onMarkPaid={onMarkPaid}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}