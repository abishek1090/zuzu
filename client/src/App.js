import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

function App() {
  
  return (
    <div className="app">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
