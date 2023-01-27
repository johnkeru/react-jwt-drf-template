import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Formik, Form } from "formik";
import InputFields from "../utils/utils-components/InputFields";
import { blue, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [userIsExisted, setUserIsExisted] = useState("");
  const nav = useNavigate();
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        {userIsExisted ? (
          <Typography sx={{ mt: 1, color: red[300] }} variant="body2">
            {userIsExisted}
          </Typography>
        ) : undefined}

        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={(values, { setErrors }) =>
            registerUser(values, setErrors, setUserIsExisted)
          }
        >
          <Form>
            <InputFields name={"email"} />
            <InputFields name={"username"} />
            <InputFields name={"password"} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mt: 5 }}
            >
              Sign Up
            </Button>
          </Form>
        </Formik>
        <Grid
          display="flex"
          mt={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">Already have an Account?</Typography>
          <Typography
            variant="body1"
            color={blue[400]}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => nav("/login")}
          >
            Sign In
          </Typography>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;
