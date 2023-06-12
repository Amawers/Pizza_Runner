import TableOne from "../ui/TableOne";
import TableTwo from "../ui/TableTwo";
import TableThree from "../ui/TableThree";
import TableFour from "../ui/TableFour";
import TableFive from "../ui/TableFive";
import TableSix from "../ui/TableSix";
import AdminDashboardNav from "../ui/AdminDashboardNav";
import BookingsCard from "../ui/BookingsCard";


export default function AdminDashboard() {
  return (
    <>
    <AdminDashboardNav />
    <BookingsCard /> 

    <div>
      <div style={{ marginTop: "50px" }}>
        <TableOne />
      </div>
      <div style={{ marginTop: "50px" }}>
        <TableTwo />
      </div>
      <div style={{ marginTop: "100px" }}>
        <TableThree />
      </div>
      <div style={{ marginTop: "100px" }}>
        <TableFour />
      </div>
      <div style={{ marginTop: "100px" }}>
        <TableFive />
      </div>
      <div style={{ marginTop: "100px" }}>
        <TableSix />
      </div>

    </div></>
  );
}
