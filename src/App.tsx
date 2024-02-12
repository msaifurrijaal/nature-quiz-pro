import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { IsLoginContextProvider } from "./context/IsLogin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <>
      <IsLoginContextProvider>
        <RouterProvider router={router} />
      </IsLoginContextProvider>
    </>
  );
}

export default App;
