import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { UserContext } from "./Context/UserContext";

const App = () => {
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser, "currentUser fetched in App.jsx");

  // AuthUser function to check if user is logged in or not
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
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
        </Route>
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
