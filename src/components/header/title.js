import React from "react";

import "./title.css";

import { useSelector } from "react-redux";

function Title() {
  const name = useSelector((state) => state.member.name);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="title_name">Hello {name}</div>
        </nav>
      </div>
    </>
  );
}

export default Title;
