import { Route, Switch } from "wouter";
import LearnReact from "./components/react/LearnReact";
import Camera from "./components/camera/Camera";
import Home from "./components/home/Home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/camera" component={Camera} />
        <Route path="/react" component={LearnReact} />
      </Switch>
    </div>
  );
}

export default App;
