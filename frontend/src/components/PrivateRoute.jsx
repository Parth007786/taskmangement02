import useAuthStatus from "../hook/useAuthStatus";
import Loading from "./Loading";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, checking } = useAuthStatus();

  if (checking) {
    return <Loading />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to={"./login"} />;
};
export default PrivateRoute;
