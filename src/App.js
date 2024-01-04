
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const PrivateRoute = ({ element }) => {
    return token ? element : <Navigate to="/login" />;
  };

  const ProtectedRoute = ({ element }) => {
    return token ? <PrivateRoute element={element} /> : <Navigate to="/login" />;
  };

  return (
    <div >
      <div >
        <Routes>
          {!token ? (
            <>  
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<PrivateRoute element={<Signup />} />} />
              <Route path="/login" element={<PrivateRoute element={<Login onLogin={handleLogin} />} />} />
              <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />

            </>

          )}
		  	<Route path="/*" element={<Navigate to="/"/>} />
        </Routes>

      </div>
    </div>
  );
};

export default App;
