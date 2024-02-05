import React from 'react'
import { Link } from "react-router-dom";

function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://a10.gaanacdn.com/gn_img/albums/Dk9KN2KBx1/k9KN8dRBWB/size_l.webp"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>Full hoouse battry backup coming later this year</h2>
        <p className="info">
          <Link className="author link"> Dawid Paszko</Link>
          <time>2024-01-15 11:44</time>
        </p>

        <p className="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quidem. Lorem,
          ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}

export default Post