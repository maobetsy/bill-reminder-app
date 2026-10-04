import type { Bill, BillStatus } from "@/types/bill";
import { normaliseDate } from "@/utils/dates";

export const getBillStatus = (dueDate: string): Exclude<BillStatus, "paid"> => {
  const today = normaliseDate(new Date());
  const due = normaliseDate(dueDate);

  const oneMonthOut = normaliseDate(new Date());
  oneMonthOut.setMonth(oneMonthOut.getMonth() + 1);

  const difference = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (difference < 0) {
    return "overdue";
  }

  if (difference <= 3) {
    return "soon";
  }

  if (due <= oneMonthOut) {
    return "upcoming";
  }

  return "later";
};

export const sumAmounts = (list: Bill[]) =>
  list.reduce((sum, bill) => sum + Number(bill.amount), 0);