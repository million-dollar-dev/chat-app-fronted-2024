import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import App from "../App";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "register",
                element:
                    <AuthLayouts>
                        <RegisterPage/>
                    </AuthLayouts>
            },
            {
                path: "login",
                element:
                    <AuthLayouts>
                        <LoginPage/>
                    </AuthLayouts>
            },
            {
                path: "",
                element: <Home/>,
                children: [
                    {
                        path: ":username",
                        element: <MessagePage/>
                    }
                ]
            }
        ]
    }
]);

export default router;