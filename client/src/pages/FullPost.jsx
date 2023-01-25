import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import axiosInstance from "../axiosInstance";

import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchComment, fetchPosts } from "../redux/slices/post";
import { selectIsAuth } from "../redux/slices/auth";
import { Index } from "../components/AddComment";

export const FullPost = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.posts);
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  const isAuth = useSelector(selectIsAuth);
  const filtered = comments?.commentsList.filter((el) => el.postId === id);

  useEffect(() => {
    axiosInstance
      .get(`/posts/${id}`)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchComment());
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Post isLoading={isLoading} FullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={data.user}
        date={data.date}
        time={data.time}
        viewsCount={data.viewsCount}
        commentsCount={filtered.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock commentsList={filtered ? filtered : []} isLoading={false}>
        {isAuth ? (
          <Index postId={id} />
        ) : (
          <h1 style={{ color: "red" }}>
            только зарегистрированный пользователь может писать комментарии !!!
          </h1>
        )}
      </CommentsBlock>
    </>
  );
};
