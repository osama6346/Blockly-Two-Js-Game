import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import * as Blockly from "blockly/core";
import blocks from "./components/Blockly/CustomBlocks";
import BlocksInitializer from "./components/Blockly/Initiliazer";
import TwoGame from "./components/Blockly/TwoGame";
import "./index.css";

BlocksInitializer();

const toolbox = {
  kind: "flyoutToolbox",
  contents: blocks.map((block) => ({ type: block.type, kind: "block" })),
};

function App() {
  const [actions, setActions] = useState([]);

  const handleButtonClick = (actionType) => {
    setActions((prevActions) => [...prevActions, actionType]);
  };

  const handleJsonChange = (e) => {
    console.log(e);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1}}>
        <BlocklyWorkspace
          onJsonChange={handleJsonChange}
          className={"blocklyContainer"}
          toolboxConfiguration={toolbox}
        />
        {/* Buttons to control the robot */}
        <div style={{ padding: "10px" }}>
          <button onClick={() => handleButtonClick("MOVE_FORWARD")}>
            Move Forward
          </button>
          <button onClick={() => handleButtonClick("TURN_RIGHT")}>
            Turn Right
          </button>
          <button onClick={() => handleButtonClick("TURN_LEFT")}>
            Turn Left
          </button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <TwoGame actions={actions} />
      </div>
    </div>
  );
}

export default App;
