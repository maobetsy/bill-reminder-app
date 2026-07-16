import Header from '@/components/Header';
import BillForm from '@/components/BillForm';
import BillList from '@/components/BillList';

export default function Home() {
  return (
    <main>
      <Header />
      <BillForm />
      <BillList />
    </main>
  );
}