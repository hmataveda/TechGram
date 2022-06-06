import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../store/services/postServices";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function Author() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const { name: authorName } = useParams();

  const navigate = useNavigate();

  const { user: loggedinUser } = useSelector((state) => state.user);

  let canUpdatePosts = false;
  if (loggedinUser.userName == authorName) {
    canUpdatePosts = true;
  }

  const postsByAuthor = posts.filter((posts) => {
    return posts.createdBy.userName == authorName;
  });

  console.log("postsByAuthor", postsByAuthor);
  console.log("loggedinUser from context", loggedinUser);
  console.log("name", authorName);

  const handleDelete = (id) => {
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const post = postsByAuthor.map((post) => {
    return (
      <div className="col-4" key={post._id}>
        <div className=" mx-2 mt-4 post pb-3 ">
          <div className="pt-3 px-4 d-flex justify-content-between">
            <span
              className="title "
              onClick={() => navigate(`/post/${post._id}`, { state: post })}
            >
              {post.title}
            </span>
            {canUpdatePosts && (
              <span className="icons ">
                <i
                  className="bi bi-trash-fill me-2"
                  onClick={() => handleDelete(post._id)}
                ></i>

                <i
                  className="bi bi-pencil-square"
                  onClick={() =>
                    navigate(`/post/update/${post._id}`, { state: post })
                  }
                ></i>
              </span>
            )}
          </div>
          <div className="img w-100 p-3">
            <img
              src={post.image}
              alt="post image"
              className="w-100 "
              height="200"
            />
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="row justify-content-center text-center mt-4 mb-3">
        <div className="col-6  ">
          <h1>{authorName}'s Profile</h1>
          {/* <p>Number of posts: 12345</p> */}
        </div>
      </div>
      <div className="row justify-content-center posts mx-5 ">{post}</div>
    </>
  );
}

export default Author;
