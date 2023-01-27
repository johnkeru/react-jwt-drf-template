import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Formik, Form } from "formik";
import InputFields from "../utils/utils-components/InputFields";
import { blue, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [userNotFound, setUserNotFound] = useState("");
  const nav = useNavigate();
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
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setErrors }) =>
            loginUser(values, setErrors, setUserNotFound)
          }
        >
          <Form>
            <InputFields name={"email"} />
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
        <Grid
          display="flex"
          mt={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">No Account?</Typography>
          <Typography
            variant="body1"
            color={blue[400]}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => nav("/register")}
          >
            Sign Up
          </Typography>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
