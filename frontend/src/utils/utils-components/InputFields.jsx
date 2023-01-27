import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const InputFields = ({ name }) => {
  const [fields, { error }] = useField(name);
  const inputProps =
    name === "password"
      ? {
          label: "Password",
          type: name,
        }
      : name === "email"
      ? {
          label: "Email",
          type: "email",
        }
      : {
          label: "Username",
          type: "text",
        };

  return (
    <TextField
      {...fields}
      {...inputProps}
      error={!!error}
      helperText={error ? error : undefined}
      variant="outlined"
      margin="normal"
      fullWidth
      id={name}
      name={name}
      autoComplete={name}
      autoFocus
    />
  );
};

export default InputFields;
