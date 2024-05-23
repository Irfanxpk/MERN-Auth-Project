import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import PrivateRoute from "../components/PrivateRoute"
import Profile from "../pages/Profile"
import AdminPrivateRoute from "../components/admin/AdminPrivateRoute"
import AdminHome from "../pages/admin/AdminHome"

const UserRoute = () => {
    return (

        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />

            </Route>
            <Route element={<AdminPrivateRoute />}>

                <Route path="/admin/*" element={<AdminHome />} />
            </Route>
        </Routes>

    )
}

export default UserRoute