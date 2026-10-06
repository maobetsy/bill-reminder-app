import { useState } from "react";

import Button from "@/components/Button";
import type { Bill } from "@/types/bill";

interface BillEditItemProps {
    bill: Bill;
    onSave: (updatedBill: Bill) => void;
    onCancel: () => void;
}

export default function BillEditItem({ bill, onSave, onCancel }: BillEditItemProps) {
    // This component only exists while a bill is being edited, so the draft
    // starts fresh from the saved bill every time Edit is clicked.
    const [draft, setDraft] = useState<Bill>(bill);

    return (
        <>
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
                <Button onClick={() => onSave(draft)}>
                    Save
                </Button>
                <Button variant="neutral" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </>
    );
}