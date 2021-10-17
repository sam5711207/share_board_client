import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { actions } from "../redux/actions/actions";
import { socketRef } from "../socket/socket";

function Entrance() {
  let [name, setName] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const toSocket = () => {
    socketRef.emit("getDraw");
    socketRef.emit("addMember", name);
  };

  const setNameToStore = (name) => {
    dispatch(actions.setName(name));
    toSocket();
  };

  const setRoute = () => {
    history.push("/start_drawing");
    setNameToStore(name);
  };
  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Your Name</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <Button
            variant="primary"
            onClick={() => {
              setRoute();
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
}

export default Entrance;
