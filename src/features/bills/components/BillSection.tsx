import type { ComponentProps } from "react";

import BillList from "@/features/bills/components/BillList";
import type { Bill } from "@/types/bill";

// Reuse BillList's handler props instead of retyping them here.
type ListHandlers = Omit<ComponentProps<typeof BillList>, "bills">;

interface BillSectionProps extends ListHandlers {
    title: string;
    bills: Bill[];
    total: number;
    headerClass: string;
    totalClass: string;
}

export default function BillSection({
    title,
    bills,
    total,
    headerClass,
    totalClass,
    ...listProps
}: BillSectionProps) {
    return (
        <>
            <h2 className={`text-xl font-semibold p-4 mb-2 text-white rounded-lg shadow-md ${headerClass}`}>
                {title}
            </h2>
            <div className="p-4">
                <p className="text-sm text-neutral-500">Total amount due</p>
                <p className={`text-2xl font-bold ${totalClass}`}>
                    ${total.toFixed(2)}
                </p>
            </div>
            <BillList bills={bills} {...listProps} />
        </>
    );
}