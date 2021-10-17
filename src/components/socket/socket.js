import socketIOClient from "socket.io-client";
import keys from "../../config/keys";
import { actions } from "../redux/actions/actions";
import store from "../redux/store";

export const socketRef = socketIOClient.connect(keys.API_URL_SOCKET);

socketRef.on("disconnect", (disconnect) => {
  store?.dispatch(actions.setConnect(false));
  console.log("disconnect", disconnect);
});
