import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";

export const CommentsBlock = ({ commentsList, children, isLoading = true }) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {commentsList &&
          (isLoading ? [...Array(1)] : commentsList).map((obj, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <div>
                      <div>loading...</div>
                      <Skeleton variant="circular" width={40} height={40} />
                    </div>
                  ) : (
                    <div>
                      <div>userID === {obj?.user?._id.slice(20)}</div>
                      <br />
                      <div>commnetID === {obj?._id.slice(20)}</div>
                      <br />
                      <div>
                        <Avatar
                          alt={obj?.user?.fullname}
                          src={obj?.user?.avatarUrl}
                        />
                      </div>
                    </div>
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <div>
                    <br />
                    <br />
                    <br />  
                    <br />  
                    <ListItemText
                      primary={obj?.user?.fullname}
                      secondary={obj?.comment}
                    />
                  </div>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
      </List>
      {children}
    </SideBlock>
  );
};
