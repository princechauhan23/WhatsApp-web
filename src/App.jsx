import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
// import useFetchUser from "./components/useFetchUser";
import { UserContext } from "./Context/UserContext";

const App = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser, "Appjs-currentUser");

  // AuthUser function to check if user is logged in or not
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      console.log(currentUser, "current user not found");
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
