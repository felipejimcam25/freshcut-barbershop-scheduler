import { BrowserRouter, Routes, Route } from "react-router-dom";
import  LoginPage  from "../pages/LoginPage";
import RegisterPage  from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import Book from "../pages/Book";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import LoyaltyPage from "../pages/LoyaltyPage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<LoginPage/>} />
                <Route path="/Login" element={<LoginPage/>} />
                <Route path="/Register" element={<RegisterPage/>} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/book" element={<Book/>} />
                    <Route path="/loyalty" element={<LoyaltyPage/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/admin/dashboard" element={<AdminDashboard/>} />
                </Route>

            </Routes>

        </BrowserRouter>
    )
}


export default AppRoutes;