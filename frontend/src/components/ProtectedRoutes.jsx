import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { randomUniqueCode } from "../utils/securedRoutes";

const ProtectedRoute = () => {
  const { user, isAuthenticated, loading } = useUserContext();
  //   console.log("USER PROTECTEDR:\n", user?.email);
  // console.log("USER PROTECTEDR:\n", user);
  // console.log("auth PROTECTEDR:\n", isAuthenticated);

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    toast.error("you haven't registered yet, register to continue");
    return <Navigate to={`/greed userform/hunter creation/${randomUniqueCode}`} replace />;
  }

  // if (!isAuthenticated) {
  //   toast.error("Please verify your e-mail to visit dashboard");
  //   return <Navigate to="/sotp" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
