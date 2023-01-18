import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BLOGS_URL } from "../utils/url";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Grid } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { tokens, logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(BLOGS_URL, {
        headers: { Authorization: "Bearer " + tokens?.access },
      })
      .then((res) => {
        setBlogs(res.data);
      })
      .catch(logout);
  }, []);

  return (
    <div>
      {blogs.length !== 0
        ? blogs.map((blog) => <Grid key={blog.id}>{blog.body}</Grid>)
        : undefined}
    </div>
  );
};

export default Home;
