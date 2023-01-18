import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const InputFields = ({ name }) => {
  const [fields, { error }] = useField(name);

  return (
    <TextField
      {...fields}
      error={!!error}
      helperText={error ? error : undefined}
      variant="outlined"
      margin="normal"
      fullWidth
      type={
        name === "password" ? "password" : name === "email" ? "email" : "text"
      }
      id={name}
      label={name}
      name={name}
      autoComplete={name}
      autoFocus
    />
  );
};

export default InputFields;
