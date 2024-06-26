import { Link } from "react-router-dom";

function SideMenu() {
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
    </div>
  );
}

export default SideMenu;
