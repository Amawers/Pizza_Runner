import TableOne from "../ui/TableOne";
import TableTwo from "../ui/TableTwo";
import TableThree from "../ui/TableThree";

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <TableOne  />
      </div>
      <div style={{ marginTop: "50px" }}>
        <TableTwo  />
      </div>
      <div style={{ marginTop: "100px" }}>
        <TableThree  />
      </div>
    </div>
  );
}
