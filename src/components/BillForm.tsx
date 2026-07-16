export default function BillForm() {
    return (
        <form>
            <input type="text" placeholder="Bill name" />
            <input type="number" placeholder="Amount" />
            <button type="submit">Add Bill</button>
        </form>
    )
}