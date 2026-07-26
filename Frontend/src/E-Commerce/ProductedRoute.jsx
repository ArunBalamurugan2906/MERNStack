import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please SignUp");
    return <Navigate to="/signUp" />;
  }

  return children;
};

export default ProtectedRoute;
