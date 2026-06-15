import TransactionTable from "./index copy";
import { MonthlyRevenue } from "./monthly-revenue";

const PaymentPage = () => {
  return (
    <div>
      <div className="lg:col-span-2 my-8">
        <MonthlyRevenue />
      </div>
      <div className="lg:col-span-2 my-8">
        <TransactionTable />
      </div>
    </div>
  );
};

export default PaymentPage;
