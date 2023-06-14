import TableOne from "../ui/TableOne";
import TableTwo from "../ui/TableTwo";
import TableThree from "../ui/TableThree";
import TableFour from "../ui/TableFour";
import TableFive from "../ui/TableFive";
import TableSix from "../ui/TableSix";
import AdminDashboardNav from "../ui/AdminDashboardNav";


export default function AdminDashboard() {
  return (
    <>
    <AdminDashboardNav />
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around"}}>
        <TableOne />
        <TableTwo />
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
