import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BLOG_URL } from "../utils/url";
import { Grid, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Blog = () => {
  const { tokens } = useContext(AuthContext);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(BLOG_URL + slug, {
        headers: { Authorization: "Bearer " + tokens.access },
      })
      .then((res) => setBlog(res.data))
      .catch((err) => setBlog(null));
  }, []);
  return (
    <Grid>
      {blog && (
        <Card key={blog.slug} sx={{ width: "40%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random/?blogs"
              alt={"no-image"}
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
      )}
    </Grid>
  );
};

export default Blog;
