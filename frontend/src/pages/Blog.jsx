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
  const { base_axios } = useContext(AuthContext);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    base_axios
      .get(BLOG_URL + slug)
      .then((res) => setBlog(res.data))
      .catch(() => setBlog(null));
  }, []);

  return (
    <Grid
      sx={{
        mt: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {blog && (
        <Card key={blog.slug} sx={{ width: "40%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={blog.image}
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
