import React from "react";
import Members from "../members/members";
import Canvas from "../canvas/canvas";
import Title from "../header/title";

function Main() {
  return (
    <>
      <div>
        <div>
          <Title />
        </div>
        <div className="d-flex justify-content-center">
          <Canvas />
          <Members />
        </div>
      </div>
    </>
  );
}

export default Main;
