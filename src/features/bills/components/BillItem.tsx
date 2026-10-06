import Button from "@/components/Button";
import BillEditItem from "@/features/bills/components/BillEditItem";
import type { Bill }  from "@/types/bill";

interface BillItemProps {
    bill: Bill;
    isEditing: boolean;
    onStartEdit: (id: string) => void;
    onSaveEdit: (id: string, updatedFields: Partial<Bill>) => void;
    onCancelEdit: () => void;
    onMarkPaid: (bill: Bill) => void;
    deleteBill: (id: string) => void;
    formatDate: (date: string) => string;
    getDueDateStatus: (dueDate: string) => string;
}

export default function BillItem({
    bill,
    isEditing,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onMarkPaid,
    deleteBill,
    formatDate,
    getDueDateStatus,
}: BillItemProps) {
    return (
        <li className="my-2 p-4 border rounded-lg shadow-sm bg-white">
            {isEditing ? (
                <BillEditItem
                    bill={bill}
                    onSave={(updatedBill) => {
                        onSaveEdit(bill.id, updatedBill);
                        onCancelEdit();
                    }}
                    onCancel={onCancelEdit}
                />
            ) : (
                <>
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
                </>
            )}
        </li>
    );
}