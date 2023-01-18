import { Button, Container, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Formik, Form } from "formik";
import InputFields from "../utils/InputFields";
import { red } from "@mui/material/colors";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [userNotFound, setUserNotFound] = useState("");
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {userNotFound ? (
          <Typography sx={{ mt: 1, color: red[300] }} variant="body2">
            {userNotFound}
          </Typography>
        ) : undefined}

        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, { setErrors }) =>
            loginUser(values, setErrors, setUserNotFound)
          }
        >
          <Form>
            <InputFields name={"username"} />
            <InputFields name={"password"} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mt: 5 }}
            >
              Sign In
            </Button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
