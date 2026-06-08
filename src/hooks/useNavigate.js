import { useNavigate } from "react-router-dom";
export default function useAppNavigate () {

    const navigate = useNavigate();

    const goToLogin = () => navigate('/login');
    
    const goToDashboard = () => navigate('/dashboard');

    const goToAdminDashboard = () => navigate('/admin/dashboard');

    const goToBook = () => navigate('/book');

    const goBack = () => navigate(-1);
    
    return {
        goToDashboard,
        goToAdminDashboard,
        goToLogin,
        goToBook,
        goBack,
    }

}