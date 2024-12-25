import { useNavigate } from "react-router";
import { useAuth } from "../../Providers/AuthProvider";

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      AdminPage
      <button onClick={() => navigate("/user")}>Go to User page</button>
      <p>Welcome to admin {user?.name}</p>
    </div>
  );
};

export default AdminPage;
