import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// will render the childs if user is logged in, otherwise will redirect them to login page.
const PrivateOutlet = () => {
  const { loginStatus } = useAuth();
  const { pathname } = useLocation();

  return loginStatus.status ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateOutlet;