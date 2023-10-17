import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import { signin } from "./service/ApiService";
import "./App.css";

function Login() {
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
    const email = data.get("email");
    const phone = data.get("phone");
    const password = data.get("password");

    //ApiService의 signin 메소드를 사용해 로그인
    signin({ email: email, phone: phone, password: password });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {" "}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="휴대폰 번호"
              name="phone"
              autoComplete="phone"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={showPassword}
              variant="outlined"
              required
              fullWidth
              id="password"
              label="패스워드"
              name="password"
              autoComplete="password"
            />
            <Button className="passwordBtn" onClick={handleShowPassword}>
              🔒
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
          <Link href="/signup" variant="body2">
            <Grid item>계정이 없습니까? 여기서 가입하세요.</Grid>
          </Link>
        </Grid>
      </form>
    </Container>
  );
}
export default Login;
