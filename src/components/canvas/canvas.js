import React, { useState, useEffect } from "react";
import { HuePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions/actions";

import "./canvas.css";

import { Stage, Layer, Line, Text } from "react-konva";

import { socketRef } from "../socket/socket";

function Canvas() {
  const dispatch = useDispatch();

  const [tool, setTool] = useState("pen");
  const [colorPen, setColorPen] = useState("#000000");
  const [shardDraw, setShardDraw] = useState();
  const [lines, setLines] = useState([]);

  const isDrawing = React.useRef(false);

  const name = useSelector((state) => state.member.name);
  const update = useSelector((state) => state.member.update);
  const nameToVisible = useSelector((state) => state.member.nameToVisible);

  var lastLine;

  useEffect(() => {
    let xlines = lines;
    xlines.find((line, i) => {
      if (line.name === nameToVisible) {
        line.visable = !line.visable;
        xlines[i].visable = line.visable;
        setLines(xlines);
      }
    });
  }, [update]);

  socketRef.on("drawingListener", (lines) => {
    setLines(lines);
  });

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    lastLine = lines[lines.length - 1];
    lastLine.color = colorPen;
    lastLine.name = name;

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastLine.visable = true;
    setShardDraw(lastLine.points);
    socketRef.emit("sendDraw", lines);
    // dispatch(actions.setLinesToStore(lines))
    // event

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseOut = () => {
    isDrawing.current = false;
  };

  const handleChangeComplete = (color) => {
    setColorPen(color.hex);
  };

  const clearLayer = () => {
    setLines([]);
  };

  return (
    <div>
      <select
        className="select_canvas"
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <button
        onClick={() => {
          clearLayer();
        }}
      >
        Clear All
      </button>
      <Stage
        className="stage_canvas"
        width={165}
        height={180}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseOut}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <>
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.5}
                visible={line.visable}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            </>
          ))}
        </Layer>
      </Stage>
      <HuePicker
        className="picker_canvas"
        color={colorPen}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
}

export default Canvas;
