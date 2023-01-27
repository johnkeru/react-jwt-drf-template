import React, { useEffect, useState } from "react";
import { BLOGS_URL } from "../utils/url";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Grid, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import BlogMenu from "../utils/utils-components/blog/BlogMenu";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { logout, base_axios, user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    base_axios
      .get(BLOGS_URL)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch(logout);
  }, []);

  return (
    <Grid display="flex" justifyContent="space-evenly" mt={2} flexWrap="wrap">
      {blogs.length !== 0
        ? blogs.map((blog) => (
            <Card
              key={blog.id}
              sx={{ width: "40%", mb: 2, position: "relative" }}
            >
              {user && user?.user_id === blog.user ? (
                <BlogMenu
                  blog={blog}
                  base_axios={base_axios}
                  BLOGS_URL={BLOGS_URL}
                  setBlogs={setBlogs}
                />
              ) : undefined}
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={blog.image}
                  alt={"no-image"}
                  onClick={() => nav(`/blogs/${blog.slug}`)}
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
