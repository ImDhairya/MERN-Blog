import React from "react";
import Post from "../Post";
import {useState, useEffect} from "react";
function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts)
      });
    });
  }, []);

 
  return (
    <div>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
}

export default IndexPage;

/* 

import React, {useEffect, useState} from "react";
import Post from "../Post";

function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((post) => {
        console.log(post);
      });
    });
  }, []);

  return (
    <div>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
}

export default IndexPage;


*/
