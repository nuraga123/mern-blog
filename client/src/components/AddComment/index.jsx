import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import styles from "./AddComment.module.scss";

import axiosInstance from "../../axiosInstance";
import { useDispatch } from "react-redux";
import { fetchComment } from "../../redux/slices/post";

export const Index = () => {
  const dispatch = useDispatch();

  const [myComment, setMyComment] = useState("");

  const sendComment = async () => {
    try {
      console.log("sendComment");
      const send = { comment: myComment };
      await axiosInstance.post("/comment", send);
      dispatch(fetchComment());
      setMyComment("");
    } catch (error) {
      alert("no send comment => ", error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchComment());
  }, []);

  return (
    <>
      <br />
      <div key={1} className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={"4"} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={5}
            onChange={(event) => setMyComment(event.target.value)}
            value={myComment}
            multiline
            fullWidth
          />
          <Button onClick={sendComment} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
