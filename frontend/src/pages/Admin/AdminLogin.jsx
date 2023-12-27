import AdminHeader from "../../components/AdminHeader/AdminHeader";
import Login from "../../components/Login/Login";

export default function AdminLogin() {
  return (
    <>
      <AdminHeader />
      <Login role="ADMIN" />
    </>
  );
}
