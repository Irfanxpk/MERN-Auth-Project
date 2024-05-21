import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import PrivateRoute from "../components/PrivateRoute"
import Profile from "../pages/Profile"

const UserRoute = () => {
    return (

        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>

    )
}

export default UserRoute