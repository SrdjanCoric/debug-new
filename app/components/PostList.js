import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, loadPosts, recountVotes } from "../actions/posts";

import "./css/_PostList.css";

const PostList = () => {
  const { error, posts, pages } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const getPosts = (page) => {
    dispatch(fetchPosts({ page }));
    dispatch(recountVotes());
  };
  if (error) {
    return (
      <div className="postList">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="postList">
      <div className="posts">
        {posts.map((post, i) => {
          const date = new Date(post.created).toLocaleDateString("en-US");
          return (
            <div className="post" key={i}>
              <div className="votes">{post.votes}</div>
              <div className="words">
                <div className="title">{post.title}</div>
                <div className="details">{post.details}</div>
              </div>
              <div className="dateWrapper">
                <div className="date">{date}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pages">
        {[...Array(pages).keys()].map((i) => {
          const page = i + 1;
          return (
            <div className="page" key={i} onClick={() => getPosts(page)}>
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PostList;
