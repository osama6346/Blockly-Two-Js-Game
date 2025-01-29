import React, { useState, useRef } from "react";
import { BlocklyWorkspace } from "react-blockly";
import blocks from "./components/CustomBlocks";
import BlocksInitializer from "./components/Initiliazer";
import TwoGame from "./components/TwoGame";
import "./index.css";

// Initialize custom Blockly blocks
BlocksInitializer();

// Define the Blockly toolbox (available blocks in the workspace)
const toolbox = {
  kind: "flyoutToolbox",
  contents: blocks.map((block) => ({ type: block.type, kind: "block" })), 
};

function App() {
  // State to store the list of actions triggered by Blockly
  const [actions, setActions] = useState([]);

  // Refs to track the last direction and last action time to prevent duplicate triggers
  const lastDirectionRef = useRef(null);
  const lastActionTimeRef = useRef(Date.now());

    // process a given Blockly block and determine what action it should trigger.
  
  const processBlocks = (block) => {
    if (block.type === "turn") {
      // Get the selected direction from the dropdown
      const directionValue = block.getFieldValue("DIRECTION");
      const now = Date.now();
      const timeSinceLastAction = now - lastActionTimeRef.current;

      // Allow repeat action if at least 1 second has passed since the last action
      const allowRepeat = timeSinceLastAction > 1000;

      if (directionValue !== lastDirectionRef.current || allowRepeat) {
        lastDirectionRef.current = directionValue;
        lastActionTimeRef.current = now;

        // Trigger TURN_LEFT or TURN_RIGHT based on the selected direction
        if (directionValue === "RIGHT") {
          setActions((prev) => [...prev, "TURN_RIGHT"]);
        } else if (directionValue === "LEFT") {
          setActions((prev) => [...prev, "TURN_LEFT"]);
        }
      }
    } else if (block.type === "repeat_until") {
      // If the block is a loop, process the nested statements inside the loop
      let statementBlock = block.getInputTargetBlock("DO");
      while (statementBlock) {
        processBlocks(statementBlock);
        statementBlock = statementBlock.getNextBlock();
      }
    } else if (block.type === "move_forward") {
      // If the block is "Move Forward", add the action to the list
      setActions((prev) => [...prev, "MOVE_FORWARD"]);
    }
  };

  //   Handles changes in the Blockly workspace.
  //  Triggers action processing when blocks are moved or updated.
  
  const handleWorkspaceChange = (workspace) => {
    const allBlocks = workspace.getTopBlocks(true); // Get all blocks at the top level
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
            <button onClick={() => setActions((prev) => [...prev, "MOVE_FORWARD"])}>
              Move Forward
            </button>
            <button onClick={() => setActions((prev) => [...prev, "TURN_RIGHT"])}>
              Turn Right
            </button>
            <button onClick={() => setActions((prev) => [...prev, "TURN_LEFT"])}>
              Turn Left
            </button>
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
