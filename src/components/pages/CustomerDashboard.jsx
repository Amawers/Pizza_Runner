import CustomerOrder from "../ui/CustomerOrder";
import AdminDashboardNav from "../ui/AdminDashboardNav";
import OrderPizza from "../ui/OrderPizza";



export default function CustomerDashboard() {
  return (
    <>
    <AdminDashboardNav />
    <CustomerOrder />
    <OrderPizza />
    </>
  );
}
