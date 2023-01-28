import { Grid, CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePost from "./pages/UpdatePost";

const App = () => {
  return (
    <Grid>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:slug" element={<UpdatePost />} />
              <Route path="/blogs/:slug" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </>
        </AuthProvider>
      </BrowserRouter>
    </Grid>
  );
};

export default App;
