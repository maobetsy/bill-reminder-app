export default function BillList({ bills, onMarkPaid, deleteBill, getDueDateStatus }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-AU");
    };

    return (
        <div>
            {bills.length === 0 ? (
                <p>No bills yet.</p>
            ) : (
                <ul>
                    {bills.map((bill) => (
                        <li key={bill.id}>{bill.name} - ${bill.amount}
                        <span>Due Date: {formatDate(bill.nextDueDate)}</span>
                        <span>({getDueDateStatus(bill.nextDueDate)})</span>
                        <button onClick={() => onMarkPaid(bill)}>Mark Paid</button>
                        <button onClick={() => deleteBill(bill.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}