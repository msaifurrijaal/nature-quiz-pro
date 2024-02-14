import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
// import HomePage from "./pages/home";
// import LoginPage from "./pages/login";
import { IsLoginContextProvider } from "./context/IsLogin";
// import QuizPage from "./pages/quiz";
import React, { Suspense } from "react";
import LoadingPage from "./pages/loading";
import { UserAuthRoute, UserPrivateRoute } from "./components/routes/UserRoute";

const HomePage = React.lazy(() =>
  wait(1000).then(() => import("./pages/home"))
);
const LoginPage = React.lazy(() =>
  wait(1000).then(() => import("./pages/login"))
);
const QuizPage = React.lazy(() =>
  wait(1000).then(() => import("./pages/quiz"))
);

const ResultPage = React.lazy(() =>
  wait(1000).then(() => import("./pages/result"))
);

const WithSuspend = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

const wait = (num: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, num);
  });
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: (
        <UserAuthRoute>
          <LoginPage />
        </UserAuthRoute>
      ),
    },
    {
      path: "/quiz",
      element: (
        <UserPrivateRoute>
          <QuizPage />
        </UserPrivateRoute>
      ),
    },
    {
      path: "/result",
      element: (
        <UserPrivateRoute>
          <ResultPage />
        </UserPrivateRoute>
      ),
    },
  ]);
  return (
    <>
      <IsLoginContextProvider>
        <WithSuspend>
          <RouterProvider router={router} />
        </WithSuspend>
      </IsLoginContextProvider>
    </>
  );
}

export default App;
