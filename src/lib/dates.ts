import type { Frequency } from "@/types/bill";

export const normaliseDate = (date: string | Date) => {
  const d = new Date(date);

  d.setHours(0, 0, 0, 0);

  return d;
};

export const calculateNextDueDate = (date: string, frequency: Frequency) => {
  const nextDueDate = new Date(date);

  if (frequency === "weekly") {
    nextDueDate.setDate(nextDueDate.getDate() + 7);
  } else if (frequency === "fortnightly") {
    nextDueDate.setDate(nextDueDate.getDate() + 14);
  } else if (frequency === "monthly") {
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);
  } else if (frequency === "quarterly") {
    nextDueDate.setMonth(nextDueDate.getMonth() + 3);
  } else if (frequency === "yearly") {
    nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
  }
  // any other frequency (including "N/A") falls through and returns the same date

  return nextDueDate.toISOString();
};