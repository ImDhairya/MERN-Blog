// import React from "react";
// import {Link} from "react-router-dom";

// function Post({_id, title, summary, cover, content, createdAt, author}) {
//   console.log(title);
//   return (
//     <div className="post">
//       <div className="image">
//         <Link to={`/post/${_id}`}>
//           <img
//             src={"http://localhost:4000/" + cover}
//             alt=""
//           />
//         </Link>
//       </div>
//       <div className="texts">
//         <Link to={`/post/${_id}`}></Link>
//         <h2>{title}</h2>
//         <p className="info">
//           <Link className="author link">{author.username}</Link>
//           <time>{formatISO9075(new Date(createdAt))}</time>
//         </p>

//         <p className="summary">{summary}</p>
//       </div>
//     </div>
//   );
// }

// export default Post;

// C:\Users\pandy\OneDrive\Desktop\Full-Stack-BLOG\api\uploads\4c5f3225b2c0b378583855052d9ae576.png

import React from "react";
import {Link} from "react-router-dom";
import {compareAsc, format, formatISO9075} from "date-fns";

function Post({_id, title, summary, cover, content, createdAt, author}) {
  return (
    <div className="post">
      <div className="image">
        <Link
          className="link"
          to={`/post/${_id}`}
        >
          <img
            src={"http://localhost:4000/" + cover}
            alt=""
          ></img>
        </Link>
      </div>
      <div className="texts">
        <Link
          className="link"
          to={`/post/${_id}`}
        >
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link className="author link"> {author.username}</Link>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>

        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
