import { Button, Grid, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BLOGS_URL } from "../utils/url";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const { user, base_axios } = useContext(AuthContext);
  const [body, setBody] = useState(blog?.body);
  const [file, setFile] = useState(null);
  const nav = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    var formdata = new FormData();
    file && formdata.append("image", file);
    formdata.append("body", body);
    formdata.append("user", user.user_id);
    base_axios
      .patch(BLOGS_URL + blog.slug + "/", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => nav("/"))
      .catch(() => undefined);
  };

  useEffect(() => {
    base_axios
      .get(BLOGS_URL + slug)
      .then((res) => {
        setBlog(res.data);
        setBody(res.data.body);
      })
      .catch(() => {
        setBlog(null);
        setBody(null);
      });
  }, []);

  return (
    <Grid sx={{ width: "50%", m: "auto", mt: 30 }}>
      <Grid>
        <TextField
          id="filled-body-static"
          label="Body"
          multiline
          fullWidth
          rows={7}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant="filled"
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}
      >
        {file?.name || blog?.image}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
          <PhotoCamera sx={{ fontSize: "40px" }} />
        </IconButton>
      </Grid>

      <Button
        fullWidth
        variant="contained"
        disabled={body === blog?.body}
        onClick={handleSubmit}
      >
        Update Post
      </Button>
    </Grid>
  );
};

export default UpdatePost;
