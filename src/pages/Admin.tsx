
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home since we no longer use authentication
    navigate('/');
  }, [navigate]);

  return null;
};

export default Admin;
