export default function BillList({ bills }) {
    return (
        <div>
            {bills.length === 0 ? (
                <p>No bills yet.</p>
            ) : (
                <ul>
                    {bills.map((bill) => (
                        <li key={bill.id}>{bill.name} - {bill.amount}</li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}