import React from "react";

import { useNavigate } from "react-router-dom";
import Form from "./form";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../../store/services/postServices";

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (post) => {
    const disp = await dispatch(createPost(post)).unwrap();
    // dispatch(createPost(post));
    navigate("/posts");
  };
  return (
    <div>
      <Form heading="Create New" handlesubmit={handleSubmit} />
    </div>
  );
}

export default Create;
