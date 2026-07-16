export default function BillList({ bills }) {
    return (
        <div>
            {bills.length === 0 ? (
                <p>No bills yet.</p>
            ) : (
                <ul>
                    {bills.map((bill, index) => (
                        <li key={index}>{bill.name} - {bill.amount}</li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}