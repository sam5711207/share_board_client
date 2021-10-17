import Main from "./components/main/main.js";
import Enter from "./components/enter/enter.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Enter />
        </Route>
        <Route path="/start_drawing">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
