import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: "12345@gmail.com",
      email: "12345@gmail.com",
      password: "12345@gmail.com",
    },

    mode: "onChange",
  });

  const onSumbit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) return alert("не удалось зарегистрироваться");

    if ("token" in data.payload)
      return window.localStorage.setItem("token", data.payload.token);
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          type={"text"}
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullname?.message)}
          helperText={Boolean(errors.fullname?.message)}
          {...register("fullname", { required: "no fullname" })}
        />

        <TextField
          type={"email"}
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={Boolean(errors.email?.message)}
          {...register("email", { required: "no email" })}
        />

        <TextField
          type={"password"}
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={Boolean(errors.password?.message)}
          {...register("password", { required: "no fullname" })}
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
