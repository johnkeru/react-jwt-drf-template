import { Grid, CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
              <Route path="/login" element={<Login />} />
            </Routes>
          </>
        </AuthProvider>
      </BrowserRouter>
    </Grid>
  );
};

export default App;
