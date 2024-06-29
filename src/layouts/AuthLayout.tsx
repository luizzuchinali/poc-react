import { Navigate, Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { SignInPath } from "../RouteNames";

function AuthLayout() {
  const isAuthenticated = localStorage.getItem("token") == null ? false : true;

  return isAuthenticated ? (
    <div className="flex">
      <div className="flex-initial">
        <SideMenu />
      </div>
      <div className="container m-4">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={SignInPath} />
  );
}

export default AuthLayout;
