import { Button, Grid, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BLOGS_URL } from "../utils/url";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");
  const { user, base_axios } = useContext(AuthContext);
  const nav = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("image", file);
    formdata.append("body", body);
    formdata.append("user", user.user_id);
    base_axios
      .post(BLOGS_URL, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => nav("/"))
      .catch(() => undefined);
  };

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
        {file?.name}
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
        disabled={!body || !file}
        onClick={handleSubmit}
      >
        Add Post
      </Button>
    </Grid>
  );
};

export default CreatePost;
