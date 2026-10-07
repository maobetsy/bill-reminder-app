import { useState, type ComponentProps } from "react";

import BillList from "@/features/bills/components/BillList";
import type { Bill } from "@/types/bill";

type ListHandlers = Omit<ComponentProps<typeof BillList>, "bills">;

interface CollapsibleBillSectionProps extends ListHandlers {
    title: string;
    bills: Bill[];
    total: number;
}

export default function CollapsibleBillSection({
    title,
    bills,
    total,
    ...listProps
}: CollapsibleBillSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-xl font-semibold p-4 mt-6 bg-slate-600 text-white rounded-lg shadow-md"
                aria-expanded={isOpen}
            >
                <span>{title} ({bills.length})</span>
                <span className="text-sm font-normal">
                    ${total.toFixed(2)} {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {isOpen && <BillList bills={bills} {...listProps} />}
        </>
    );
}