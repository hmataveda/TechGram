import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Form from "./form";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../store/services/postServices";

function Update() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { state } = useLocation();
  // console.log("state", state);
  const handleSubmit = (post, id) => {
    console.log("post", post);
    dispatch(updatePost({ post, id }))
      .unwrap()
      .then((data) => {
        console.log("data", data);
        navigate("/posts");
      });
  };
  return (
    <div>
      <Form heading="Update New" handlesubmit={handleSubmit} />
    </div>
  );
}

export default Update;
