import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/useAuth";

const PrivateRoutes = () => {
  const { auth, onAuthStateChanged, setCurrentUser, currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth, onAuthStateChanged, setCurrentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
