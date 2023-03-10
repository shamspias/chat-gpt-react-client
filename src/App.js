import "./App.css";
import React from "react";
import ChatUi from "./components/ChatUi";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <main className="relative">
        <AuthProvider>
          <Navbar />

          <Routes>
   
            <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatUi />
            </PrivateRoute>
          }
        />
            <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login/>}/>
          </Routes>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
