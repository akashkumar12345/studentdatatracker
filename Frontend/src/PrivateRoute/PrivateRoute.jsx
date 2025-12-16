import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function PrivateRoute({ children }) {
  const token = Cookies.get("token"); // Read token from cookie
  // console.log("token is here",jwtDecode(token).email);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default PrivateRoute;
