import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
