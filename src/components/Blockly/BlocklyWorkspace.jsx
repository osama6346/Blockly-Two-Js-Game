import React from "react";
import { BlocklyWorkspace } from "react-blockly";
import * as Blockly from "blockly/core";
import Toolbox from "./Toolbox";
import "./CustomBlocks";
import BlocksInitializer from './Initiliazer'
BlocksInitializer();
const BlocklyWorkspaceComponent = ({ onCodeChange }) => {
  const handleWorkspaceChange = (workspace) => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    onCodeChange(code);
  };

  return (
    <BlocklyWorkspace
      toolboxConfiguration={Toolbox}
      workspaceConfiguration={{
        grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
      }}
      onWorkspaceChange={handleWorkspaceChange}
      className="blockly-workspace"
    />
  );
};

export default BlocklyWorkspaceComponent;
