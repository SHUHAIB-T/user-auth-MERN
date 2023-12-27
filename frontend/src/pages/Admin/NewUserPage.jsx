import AdminHeader from "../../components/AdminHeader/AdminHeader";
import Signup from "../../components/Signup/Signup";
export default function NewUserPage() {
  return (
    <>
      <AdminHeader />
      <Signup role="ADMIN" />
    </>
  );
}
