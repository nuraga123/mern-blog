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
  const { comments, posts } = useSelector((state) => state.posts);
  const commentsCount = comments?.commentsList.length;

  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    axiosInstance
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, [id]);

  useEffect(() => {
    dispatch(fetchComment());
    dispatch(fetchPosts());
  }, [dispatch]);

  const usersArray = posts?.items;
  const commentsArray = comments?.commentsList;
  let result = [];
  for (let index = 0; index < usersArray.length; index++) {
    const element = usersArray[index]?.user?._id;

    result = commentsArray.filter(
      (commentID) => commentID?.user?._id === element
    );
  }
  console.log(result);

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
        commentsCount={commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock commentsList={result ? result : []} isLoading={false}>
        {isAuth ? (
          <Index />
        ) : (
          <h1 style={{ color: "red" }}>
            только зарегистрированный пользователь может писать комментарии !!!
          </h1>
        )}
      </CommentsBlock>
    </>
  );
};
