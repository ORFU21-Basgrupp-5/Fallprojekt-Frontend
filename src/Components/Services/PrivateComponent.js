import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateOutlet = () => {
  const { loginStatus } = useAuth();
  const { pathname } = useLocation();
  console.log({ pathname });

  return loginStatus ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateOutlet;