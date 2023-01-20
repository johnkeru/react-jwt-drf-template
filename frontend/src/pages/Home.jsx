import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BLOGS_URL } from "../utils/url";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Grid, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
    <Grid display="flex" justifyContent="space-evenly" mt={2}>
      {blogs.length !== 0
        ? blogs.map((blog) => (
            <Card key={blog.id} sx={{ width: "40%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/?blogs"
                  alt="https://source.unsplash.com/random/?blogs"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {blog.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.body}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        : "No blogs available. :<"}
    </Grid>
  );
};

export default Home;
