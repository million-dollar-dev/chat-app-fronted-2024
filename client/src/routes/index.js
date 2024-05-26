import { createBrowserRouter } from "react-router-dom";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import App from "../App";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout/AuthLayout";

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
                path: "email",
                element:
                    <AuthLayouts>
                        <CheckEmailPage/>
                    </AuthLayouts>
            },
            {
                path: "password",
                element:
                    <AuthLayouts>
                        <CheckPasswordPage/>
                    </AuthLayouts>
            },
            {
                path: "",
                element: <Home/>,
                children: [
                    {
                        path: ":userId",
                        element: <MessagePage/>
                    }
                ]
            }
        ]
    }
]);

export default router;