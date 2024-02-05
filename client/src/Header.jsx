import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";

function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    window.location.href = '/login'
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link
        to={"/"}
        className="logo link"
      >
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link className="link" to="/create">Create new Post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link className="link" to="/login">Login</Link>
            <Link className="link" to="/register">Register</Link>
          </>
        )}
        {/* <Link
          to={"/login"}
          className=" link"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className=" link"
        >
          Register
        </Link> */}
      </nav>
    </header>
  );
}

export default Header;
