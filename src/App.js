import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Loading from "./pages/loading";
import Verification from "./pages/verification";
import SearchPage from "./pages/search";
import { AuthProvider, ProtectedRoute } from "./context/auth";
import { ModalProvider } from "./context/modal";
import Welcome from "./pages/welcome";
import Navigation from "./components/navigation";
import ViewProfile from "./pages/profile";
import Button from "./components/button";
import Card from "./components/card";
import Comment from "./components/comment";
import CredentialsCard from "./components/credentials";
import SocialLinks from "./components/socialLinks";
import Header from "./components/header";
import MyCohort from "./pages/mycohort/MyCohort";
import EditProfile from "./pages/edit";


const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="loading" element={<Loading />} />
            <Route path="verification" element={<Verification />} />


            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="welcome"
              element={
                <ProtectedRoute disabledNav={true}>
                  <Welcome />
                </ProtectedRoute>
              }
            />
            <Route
              path="MyCohort"
              element={
                <ProtectedRoute>
                  <MyCohort />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <ViewProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
                
              <Route 
                  path="search"
                   element={
                       <ProtectedRoute>
                            <SearchPage />
                       </ProtectedRoute>
                  }
              />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </>
  );

};

export default App;
