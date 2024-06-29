import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ViaCepPage from "./pages/ViaCepPage";
import SignInPage from "./pages/SignInPage";
import { HomePath, SignInPath, ViaCepPath } from "./RouteNames";

const router = createBrowserRouter([
  {
    path: HomePath,
    element: <AuthLayout />,
    children: [
      {
        path: HomePath,
        element: <HomePage />,
      },
      {
        path: ViaCepPath,
        element: <ViaCepPage />,
      },
    ],
  },
  {
    path: SignInPath,
    element: <SignInPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
