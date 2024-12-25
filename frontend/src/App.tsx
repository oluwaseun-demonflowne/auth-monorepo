import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./pages/Login/Page";
import RegisterPage from "./pages/Register/Page";
import AuthLayout from "./Providers/AuthLayout";
import AdminPage from "./pages/Admin/AdminPage";
import UserPage from "./pages/User/UserPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
