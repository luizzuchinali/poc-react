import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

function GlobalLayout() {
  return (
    <div className="flex">
      <div className="flex-initial">
        <SideMenu />
      </div>
      <div className="container m-4">
        <Outlet />
      </div>
    </div>
  );
}

export default GlobalLayout;
