// wedding day
// 28 Nov 23 and attended a new wedding in lkw
import { Route, Switch } from "wouter";
import LearnReact from "./improvs/react/LearnReact";
import Camera from "./improvs/camera/Camera";
import Home from "./improvs/home/Home";
import WaterBuckets from "./improvs/waterbuckets/WaterBuckets";
import QR from "./improvs/qrcode/QR";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/camera" component={Camera} />
        <Route path="/react" component={LearnReact} />
        <Route path="/water-bucket-challenge" component={WaterBuckets} />
        <Route path="/qr" component={QR} />
      </Switch>
    </div>
  );
}

export default App;
