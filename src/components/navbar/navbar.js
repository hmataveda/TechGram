import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/services/userServices";
import { searchPost } from "../../store/Slices/postSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const dispatchLogout = await dispatch(logout()).unwrap();
      console.log("dispatchLogout", dispatchLogout);
      navigate("/login");
    } catch (err) {
      console.log("error while logging out", err);
    }
  };
  const [searchWord, setsearchWord] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.firstChild.value);
    setsearchWord(e.target.firstChild.value);
  };

  const contexValue = {
    searchWord: searchWord,
    user: user,
  };

  return (
    <>
      <div className="row justify-content-center pt-1 pb-3 navbar">
        <div className="col-5 mt-2 d-flex">
          <h1 className="icon px-4">Techgram</h1>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="search"
              className="px-3 py-2 "
            ></input>
          </form>
        </div>
        <div className="col-5 mt-3 ">
          <button
            className="createButton"
            onClick={() => navigate("/post/new")}
          >
            Create
          </button>
          <i
            className="bi bi-house-door-fill"
            onClick={() => navigate("/posts")}
          ></i>
          {isLoggedIn && (
            <>
              <span className="mx-3 px-3">Hello {user.userName} !!!</span>
              <span className="logout" onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
          {!isLoggedIn && (
            <>
              <span
                className="mx-3 ps-3 logout"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
              <span className="logout pe-2">| </span>
              <span className="logout " onClick={() => navigate("/login")}>
                Login
              </span>
            </>
          )}
        </div>
      </div>

      <Outlet context={contexValue} />
    </>
  );
}

export default Navbar;
