import GlobalLayout from "./layouts/GlobalLayout";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ViaCepPage from "./pages/ViaCepPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/viacep",
        element: <ViaCepPage />,
      },
    ],
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
