import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import SpotList from "./components/Spot/SpotList";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className="container">
      <header>
        <Navigation isLoaded={isLoaded} />
      </header>
      <main>
        {isLoaded && <Outlet />}
      </main>
    </div>

  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path:"/",
        element: <SpotList />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
