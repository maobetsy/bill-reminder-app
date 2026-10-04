import { normaliseDate } from "@/lib/dates";

export function pluralise(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

export function getDueDateStatus(dueDate: string) {
  const today = normaliseDate(new Date());
  const due = normaliseDate(dueDate);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.round((due.getTime() - today.getTime()) / msPerDay);

  if (diffInDays === 0) return "Due today";
  if (diffInDays > 0) return `${diffInDays} ${pluralise(diffInDays, "day")} left`;

  const overdueDays = Math.abs(diffInDays);
  return `Overdue by ${overdueDays} ${pluralise(overdueDays, "day")}`;
}