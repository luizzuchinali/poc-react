import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { SignInPath } from "../RouteNames";

function SideMenu() {
  const navigate = useNavigate();
  const authService = new AuthService();

  const signOutOnClick = async () => {
    await authService.signOut();
    navigate(SignInPath);
  };

  return (
    <div className="flex w-64 flex-col place-items-center">
      <div className="mb-4 mt-4">
        <span className="text-5xl">PocReact</span>
      </div>
      <Link
        className="w-64 p-2 text-center text-2xl duration-75 hover:bg-gray-200 hover:text-3xl"
        to="/"
      >
        Home
      </Link>
      <Link
        className="w-64 p-2 text-center text-2xl duration-75 hover:bg-gray-200 hover:text-3xl"
        to="/viacep"
      >
        ViaCep
      </Link>

      <Link
        onClick={signOutOnClick}
        className="w-64 p-2 text-center text-2xl duration-75 hover:bg-gray-200 hover:text-3xl"
        to="#"
      >
        Sign out
      </Link>
    </div>
  );
}

export default SideMenu;
