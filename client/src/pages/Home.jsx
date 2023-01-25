import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAuthMe } from "../redux/slices/auth.js";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import {
  fetchPosts,
  fetchTags,
  fetchPopularPosts,
  fetchRemovePostsAll,
  fetchComment,
} from "../redux/slices/post.js";

export const Home = () => {
  const [category, setCategory] = useState(0);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const { posts, tags, postsPopular, comments } = useSelector(
    (state) => state.posts
  );

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentLoading = comments.status === "loading";

  const domen = window.location.pathname;

  useEffect(() => {
    if (posts?.items.length >= 0) {
      dispatch(fetchTags());
      dispatch(fetchPosts());
      dispatch(fetchPopularPosts());
      dispatch(fetchAuthMe());
      dispatch(fetchComment());
    }
  }, []);

  const DeletePosts = () => {
    dispatch(fetchRemovePostsAll());
  };

  const mapPosts =
    domen === "/posts/popular"
      ? postsPopular?.items?.map((obj, index) => (
          <Post
            id={obj._id}
            key={index}
            title={obj.title}
            imageUrl={
              obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
            }
            user={obj.user}
            date={obj.date}
            time={obj.time}
            viewsCount={obj.viewsCount}
            commentsCount={0}
            isLoading={false}
            tags={obj.tags}
            isEditable={userData?._id === obj?.user?._id}
          />
        ))
      : posts?.items?.map((obj, index) => (
          <Post
            id={obj._id}
            key={index}
            title={obj.title}
            imageUrl={
              obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
            }
            user={obj.user}
            time={obj.time}
            date={obj.date}
            viewsCount={obj.viewsCount}
            commentsCount={0}
            isLoading={false}
            tags={obj.tags}
            isEditable={userData?._id === obj?.user?._id}
          />
        ));

  if (isPostLoading) {
    return <Post isLoading={true} />;
  }

  if (isCommentLoading) {
    return <CommentsBlock isLoading={true} />;
  }

  return (
    <>
      {posts?.items?.length >= 1 ? (
        <Button color="error" variant="outlined" onClick={DeletePosts}>
          DELETE POSTS
        </Button>
      ) : (
        <Button disabled>DELETE POSTS</Button>
      )}
      <Tabs
        style={{ marginBottom: 15 }}
        value={category}
        aria-label="basic tabs example"
      >
        <Link to={"/posts"}>
          <Tab label="Новые" onClick={() => setCategory(0)} />
        </Link>

        <Link to={"/posts/popular"}>
          <Tab
            label="Популярное"
            onClick={() => setCategory(1)}
            selected={true}
          />
        </Link>
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item id={"posts"}>
          {posts?.items?.length >= 1 ? mapPosts : <div>not posts</div>}
        </Grid>

        <Grid xs={4} item>
          {/* <TagsBlock items={tags?.items} isLoading={isTagsLoading}/> */}

          <CommentsBlock
            commentsList={comments?.commentsList}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
