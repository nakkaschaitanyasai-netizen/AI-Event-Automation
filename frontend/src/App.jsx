import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
