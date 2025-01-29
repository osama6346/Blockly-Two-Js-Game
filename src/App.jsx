import React, { useState, useRef } from "react";
import { BlocklyWorkspace } from "react-blockly";
import blocks from "./components/CustomBlocks";
import BlocksInitializer from "./components/Initiliazer";
import TwoGame from "./components/TwoGame";
import "./index.css";

BlocksInitializer();

const toolbox = {
  kind: "flyoutToolbox",
  contents: blocks.map((block) => ({ type: block.type, kind: "block" })),
};

function App() {
  const [actions, setActions] = useState([]);
  const lastDirectionRef = useRef(null);
  const lastActionTimeRef = useRef(Date.now());

  const processBlocks = (block) => {
    if (block.type === "turn") {
      const directionValue = block.getFieldValue("DIRECTION");
      const now = Date.now();
      const timeSinceLastAction = now - lastActionTimeRef.current;

      const allowRepeat = timeSinceLastAction > 1000;

      if (directionValue !== lastDirectionRef.current || allowRepeat) {
        lastDirectionRef.current = directionValue;
        lastActionTimeRef.current = now;

        if (directionValue === "RIGHT") {
          setActions((prev) => [...prev, "TURN_RIGHT"]);
        } else if (directionValue === "LEFT") {
          setActions((prev) => [...prev, "TURN_LEFT"]);
        }
      }
    } else if (block.type === "repeat_until") {
      let statementBlock = block.getInputTargetBlock("DO");
      while (statementBlock) {
        processBlocks(statementBlock);
        statementBlock = statementBlock.getNextBlock();
      }
    } else if (block.type === "move_forward") {
      setActions((prev) => [...prev, "MOVE_FORWARD"]);
    }
  };

  const handleWorkspaceChange = (workspace) => {
    const allBlocks = workspace.getTopBlocks(true);
    allBlocks.forEach((block) => {
      processBlocks(block);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="blocklyContainerWrapper">
          <BlocklyWorkspace
            className="blocklyContainer"
            toolboxConfiguration={toolbox}
            onWorkspaceChange={handleWorkspaceChange}
            
          />
          <div className="buttonContainer">
            <button onClick={() => setActions((prev) => [...prev, "MOVE_FORWARD"])}>Move Forward</button>
            <button onClick={() => setActions((prev) => [...prev, "TURN_RIGHT"])}>Turn Right</button>
            <button onClick={() => setActions((prev) => [...prev, "TURN_LEFT"])}>Turn Left</button>
          </div>
        </div>

        <div className="twoGameContainer">
          <TwoGame actions={actions} />
        </div>
      </div>
    </div>
  );
}

export default App;
