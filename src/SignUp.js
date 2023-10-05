import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useState } from "react";
import { signup } from "./service/ApiService";

function SignUp() {
  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = () => {
    setShowPassword(() => {
      if (showPassword == "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="사용자 이름"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="current-password"
              type={showPassword}
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="패스워드"
              autoFocus
            />
            <Button className="passwordBtn" onClick={handleShowPassword}>
              🔒
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
