import Button from "@/components/Button";
import BillEditItem from "@/features/bills/components/BillEditItem";
import type { Bill }  from "@/types/bill";
import { formatDate, getDueDateStatus } from "@/utils/format";

interface BillItemProps {
    bill: Bill;
    isEditing: boolean;
    onStartEdit: (id: string) => void;
    onSave: (id: string, updatedFields: Partial<Bill>) => void;
    onCancel: () => void;
    onMarkPaid: (bill: Bill) => void;
    deleteBill: (id: string) => void;
}

export default function BillItem({
    bill,
    isEditing,
    onStartEdit,
    onSave,
    onCancel,
    onMarkPaid,
    deleteBill,
}: BillItemProps) {
    return (
        <li className="my-2 p-4 border rounded-lg shadow-sm bg-white">
            {isEditing ? (
                <BillEditItem
                    bill={bill}
                    onSave={(updatedBill) => {
                        onSave(bill.id, updatedBill);
                        onCancel();
                    }}
                    onCancel={onCancel}
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