
// defincing the blocks for out Blockly toolbox
export default [
  {
    type: "turn",
    message0: "Turn %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DIRECTION",
        options: [
          ["right ↻", "RIGHT"],
          ["left ↺", "LEFT"],
        ],
      },
    ],
    previousStatement: true, 
    nextStatement: true, 
    colour: 160,
    tooltip: "Turn the object.",
    helpUrl: "",
  },
  {
    type: "repeat_until",
    message0: "Repeat until %1",
    args0: [
      {
        type: "field_dropdown",
        name: "CONDITION",
        options: [["obstacle", "OBSTACLE"]],
      },
    ],
    message1: "do %1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: true, 
    nextStatement: true, 
    colour: 120,
    tooltip: "Repeat until the specified condition is met.",
    helpUrl: "",
  },
  {
    type: "move_forward",
    message0: "Move forward",
    previousStatement: true,
    nextStatement: true, 
    colour: 290,
    tooltip: "Move the object forward.",
    helpUrl: "",
  },
];
