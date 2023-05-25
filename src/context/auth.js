import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Header from "../components/header";
import Modal from "../components/modal";
import Navigation from "../components/navigation";
import useAuth from "../hooks/useAuth";
import {
  createProfile,
  getUserProfile,
  login,
  register,
} from "../service/apiClient";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !token) {
      setToken(storedToken);
      navigate("/");
    }
    if (token) {
      const decoded = jwt_decode(token);
      setUserId(decoded.userId);
      getUserProfile(decoded.userId).then((profile) => {
        setProfile(profile);
      });
    }
  }, [navigate, token]);

  const handleLogin = async (email, password, successRoute = "/") => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate("/login");
    }

    localStorage.setItem("token", res.data.token);

    setToken(res.data.token);
    navigate(successRoute);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password);
    if (res.status === "fail") {
      throw new Error(res.data.error);
    }
    setToken(res.data.token);
    navigate("/verification");
  };

  const handleCreateProfile = async (firstName, lastName, githubUrl, bio) => {
    const { userId } = jwt_decode(token);

    const user = await createProfile(userId, firstName, lastName, githubUrl, bio);
	setProfile(user.data.profile)
	console.log('temp',user)
    localStorage.setItem("token", token);
    navigate("/");
  }; 

  const value = {
    token,
    userId,
    profile,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token, profile } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }
  console.log('location path name', location.pathname)
  console.log('profile', profile)
  if ((!profile || !profile.firstName) && location.pathname !== '/welcome') {
    return <Navigate to={"/welcome"} replace state={{ from: location }} />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
