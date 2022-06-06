import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAllposts } from "../../store/services/postServices";
require("./components.css");

function AllPosts() {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.user);

  const [localPosts, setLocalPosts] = useState(posts);

  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/");
  }
  useEffect(() => {
    console.log("in getting all users through useEffect");
    dispatch(getAllposts())
      .unwrap()
      .then((res) => setLocalPosts(res));
  }, []);

  const { searchWord } = useOutletContext();

  useEffect(() => {
    if (searchWord) {
      console.log("coming inside");
      const searchedPosts = localPosts.filter(
        (post) => post.title.toLowerCase().indexOf(searchWord) != -1
      );
      console.log(searchedPosts);
      setLocalPosts(searchedPosts);
    } else {
      setLocalPosts(posts);
    }
  }, [searchWord]);

  const post = localPosts.map((post) => {
    return (
      <div className="row justify-content-center posts" key={post._id}>
        <div className="col-5  m-4 post pb-3">
          <div
            className="title pt-3 px-2"
            onClick={() => navigate(`/post/${post._id}`, { state: post })}
          >
            {" "}
            {post.title}
          </div>
          <div className="img w-100 p-3">
            <img src={post.image} alt="post image" className="w-100 " />
          </div>
          <div
            className="author pb-3 px-3"
            onClick={() => {
              navigate(`/author/${post.createdBy.userName}`);
            }}
          >
            <span className="face">
              {post.createdBy.userName[0].toUpperCase()}
            </span>
            {post.createdBy.userName}
          </div>
          <div className="description pb-3 px-3">{post.description}</div>
        </div>
      </div>
    );
  });
  if (isLoading) {
    return <h1>Loadddibgggg1!!!!!!!!!!</h1>;
  }

  return <div>{post}</div>;
}

export default AllPosts;
