import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from cookies or any storage
    Cookies.remove('token');
    // Optionally clear other user data here

    // Redirect to login page after logout
    navigate('/');
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default LogoutPage;
