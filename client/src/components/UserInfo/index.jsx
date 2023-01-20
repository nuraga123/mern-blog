import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ user, date, time }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={user?.avatarUrl ? user?.avatarUrl : "/noavatar.png"}
        alt={user?.fullname}
      />
      <div className={styles.userDetails}>
        <br />
        <span className={styles.userName}>{user?.fullname}</span>
        <span className={styles.dateAndTime}>{`${date} ${time}`}</span>
      </div>
    </div>
  );
};
