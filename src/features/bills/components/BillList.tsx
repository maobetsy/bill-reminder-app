import BillItem from "@/features/bills/components/BillItem";
import type { Bill } from "@/types/bill";

interface BillListProps {
    bills: Bill[];
    editingId: string | null;
    onMarkPaid: (bill: Bill) => void;
    onStartEdit: (id: string) => void;
    onSave: (id: string, updatedFields: Partial<Bill>) => void;
    onCancel: () => void;
<<<<<<< HEAD
    onDelete: (id: string) => void;
=======
    deleteBill: (id: string) => void;
    getDueDateStatus: (dueDate: string) => string;
>>>>>>> 7b441b32beb8004e9e7628faa2fec199743af961
}

export default function BillList({
    bills,
    editingId,
    onMarkPaid,
    onStartEdit,
    onSave,
    onCancel,
<<<<<<< HEAD
    onDelete,
=======
    deleteBill,
    getDueDateStatus,
>>>>>>> 7b441b32beb8004e9e7628faa2fec199743af961
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