import { Navigate } from "react-router-dom";
import { useIsUserLogin } from "../../context/IsLogin";

const UserAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUserLogin } = useIsUserLogin();

  return !isUserLogin ? children : <Navigate to="/" />;
};

const UserPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUserLogin } = useIsUserLogin();

  return isUserLogin ? children : <Navigate to="/" />;
};

export { UserPrivateRoute, UserAuthRoute };
