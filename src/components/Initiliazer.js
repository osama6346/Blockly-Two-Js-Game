import * as Blockly from "blockly/core";
import blocks from "./CustomBlocks";

//Initiliazing the Blockly workspace with the customblocks
const BlocksInitializer = () => {
  Blockly.defineBlocksWithJsonArray(blocks);
};

export default BlocksInitializer;
