export default function BillList({ bills, onMarkPaid, deleteBill, getDueDateStatus }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-AU");
    };

    return (
        <div className="py-2 px-4 mb-6 bg-neutral-100 rounded-lg shadow-md">
            {bills.length === 0 ? (
                <p className="p-4">No bills yet.</p>
            ) : (
                <ul>
                    {bills.map((bill) => (
                        <li 
                            key={bill.id} 
                            className="my-2 p-4 border rounded-lg shadow-sm bg-white"
                        >
                            <span className="block font-semibold">{bill.name} - ${bill.amount}</span>
                            <span className="block text-sm text-gray-600">
                                Due Date: {formatDate(bill.nextDueDate)} ({getDueDateStatus(bill.nextDueDate)})
                            </span>
                          
                            <div className="mt-2 flex gap-2">
                                <button onClick={() => onMarkPaid(bill)} className="p-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                                    Mark Paid
                                </button>
                                <button onClick={() => deleteBill(bill.id)} className="p-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}