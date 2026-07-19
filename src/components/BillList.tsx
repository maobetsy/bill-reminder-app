export default function BillList({ bills, deleteBill }) {
    return (
        <div>
            {bills.length === 0 ? (
                <p>No bills yet.</p>
            ) : (
                <ul>
                    {bills.map((bill) => (
                        <li key={bill.id}>{bill.name} - {bill.amount}
                        <button onClick={() => deleteBill(bill.id)}>Delete</button></li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}