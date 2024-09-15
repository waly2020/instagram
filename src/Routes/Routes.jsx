import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";

const routes = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "/profil",
        element : <Profile/>
    },
    {
        path : "*",
        element : <Navigate to="/"/>
    }
])

const RoutesApp = () => {
    return (
        <RouterProvider router={routes}/>
    );
}

export default RoutesApp;
