import * as Blockly from "blockly/core";
import blocks from "./CustomBlocks";

const BlocksInitializer = () => {
  Blockly.defineBlocksWithJsonArray(blocks);
};

export default BlocksInitializer;
