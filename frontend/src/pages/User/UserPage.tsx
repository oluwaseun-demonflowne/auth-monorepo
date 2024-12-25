import { useNavigate } from "react-router";
import { useAuth } from "../../Providers/AuthProvider";

const UserPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      UserPage
      <button onClick={() => navigate("/admin")}>Go to Admin page</button>
      <p>{user?.name}</p>
      <button onClick={() => {logout()}}>Log out</button>
    </div>
  );
};

export default UserPage;
