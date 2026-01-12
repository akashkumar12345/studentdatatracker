import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import Signup from './SignUp/Signup';
import Login from './SignIn/Login';
import Home from './HomePage/Home';
import Dashboard from './Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LogoutPage from './Logout/Logout';
import StickyHeadTable from './FormComponent/Table';
import Cookies from "js-cookie";
import { useState } from 'react';
import { Alert, Stack } from '@mui/material';
import DropDown from './FormComponent/DropDown';
import StudentLoader from './StudentLoader';
import Search from './Forms/Search';
import MarksForm from './Forms/MarksForm';
import MarksBarChart from './Charts/Demo';
import Dashboard2 from './Charts/Demo2';
// import FancyAlert from './FormComponent/FancyAlert';
import SomeComponent from './Forms/SomeComponent';
import HighestMarks from './Charts/HighestMarks';
import AboutSection from './Forms/AboutSection';
import ContactSection from './Forms/ContactSection';
import OtpVerify from './OTP/OtpVerify';

function App() {
  // const navigate = useNavigate();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  
  // Remove token and sessionStorage on page unload (refresh or close)
  useEffect(() => {
    const handleUnload = () => {
      Cookies.remove("token");
      sessionStorage.setItem("loggedOutDueToRefresh", "true");
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("loggedOutDueToRefresh") === "true") {
      setShowLogoutMsg(true);
      // showLogoutMsg("Do not refresh page");
      sessionStorage.removeItem("loggedOutDueToRefresh");
    }
  }, []);


  return (

    <Router>
      {showLogoutMsg && (
        <Stack
          sx={{
            width: '100%',
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 1300
          }}
          spacing={2}
        >
          {showLogoutMsg && (
            <Alert
              severity="warning"
              onClose={() => setShowLogoutMsg(false)}
            >
              Please log in again. You were logged out due to page refresh, for your security.
            </Alert>
          )}
        </Stack>
      )}
      <Routes>
        {/* public routes */}
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Login />} />
          {/* <Route path="otp-verify" element={<OtpVerify />} /> */}
          <Route path="otp-verify/:email" element={<OtpVerify />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path='about' element={<AboutSection/>}/>
          <Route path='contact' element = {<ContactSection/>}/>
        </Route>

        {/* protected route */}
        <Route
          path="/dash"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="demo" element={<ContactSection />} />
        <Route path='demo3' element={<OtpVerify />} />
      </Routes>
    </Router>
  );
}

export default App;
