// import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

library.add(fab, fas, far);

const Home = () => {
  return (
    <div className="container">
      <div className="app-container">
        <div id="cont-a1">
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
