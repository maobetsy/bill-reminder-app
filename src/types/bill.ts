export type Frequency = "weekly" | "fortnightly" | "monthly" | "quarterly" | "yearly" | "N/A";
export type BillStatus = "overdue" | "soon" | "upcoming" | "later" | "paid";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  nextDueDate: string;
  frequency: Frequency;
  isPaid: boolean;
}

export interface PaymentRecord {
  id: string;
  billId: string;
  name: string;
  amount: number;
  paidDate: string;
  dueDate: string;
}