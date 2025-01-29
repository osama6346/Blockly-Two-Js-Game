import React, { useEffect, useRef } from "react";
import Two from "two.js";

const TwoGame = ({ actions }) => {
  const gameRef = useRef(null); // Reference to the game container
  const twoRef = useRef(null); // Reference to the Two.js instance
  const robotGroupRef = useRef(null); // Reference to the robot group

  // Define canvas and robot dimensions
  const CANVAS_SIZE = { width: 500, height: 500 };
  const ROBOT_SIZE = { width: 80, height: 120 };

  
   // Checks if the given (x, y) position would result in a collision with the boundaries.
  
  const isCollision = (x, y) => {
    const halfWidth = ROBOT_SIZE.width / 2;
    const halfHeight = ROBOT_SIZE.height / 2;

    return (
      x - halfWidth < 0 || // Left boundary
      x + halfWidth > CANVAS_SIZE.width || // Right boundary
      y - halfHeight < 0 || // Top boundary
      y + halfHeight > CANVAS_SIZE.height // Bottom boundary
    );
  };

  
   // Initializes the Two.js canvas and creates the robot when the component mounts.
   
  useEffect(() => {
    if (gameRef.current && !twoRef.current) {
      const params = { width: CANVAS_SIZE.width, height: CANVAS_SIZE.height };
      const two = new Two(params).appendTo(gameRef.current);
      twoRef.current = two;

      if (!robotGroupRef.current) {
        const group = two.makeGroup();

        // Robot body
        const body = two.makeRectangle(0, 0, ROBOT_SIZE.width, ROBOT_SIZE.height);
        body.fill = "#808080";
        body.stroke = "black";
        body.linewidth = 3;

        // Robot head
        const head = two.makeRectangle(0, -70, 60, 40);
        head.fill = "#A9A9A9";
        head.stroke = "black";
        head.linewidth = 2;

        // Robot left eye
        const leftEye = two.makeCircle(-10, -75, 5);
        leftEye.fill = "white";
        leftEye.stroke = "black";

        // Robot arms
        const leftArm = two.makeRectangle(-50, 0, 10, 60);
        leftArm.fill = "#A9A9A9";
        leftArm.stroke = "black";

        const rightArm = two.makeRectangle(50, 0, 10, 60);
        rightArm.fill = "#A9A9A9";
        rightArm.stroke = "black";

        // Group all parts together
        group.add(body, head, leftEye, leftArm, rightArm);
        group.translation.set(250, 250); // Set initial position at center
        robotGroupRef.current = group;
      }

      two.update(); // Render the scene
    }

    // Cleanup when component unmounts
    return () => {
      if (twoRef.current) {
        twoRef.current.clear();
        twoRef.current = null;
        robotGroupRef.current = null;
      }
    };
  }, []);

  
   // Handles movement and rotation actions when the `actions` prop updates.
   
  useEffect(() => {
    if (actions.length > 0 && twoRef.current && robotGroupRef.current) {
      const group = robotGroupRef.current;

      // Get the last action from the actions array
      const action = actions[actions.length - 1];

      switch (action) {
        case "MOVE_FORWARD": {
          const angle = group.rotation; // Get current rotation angle
          const dx = Math.cos(angle) * 20; // Calculate x movement
          const dy = Math.sin(angle) * 20; // Calculate y movement

          const newX = group.translation.x + dx;
          const newY = group.translation.y + dy;

          // Move the robot only if there's no collision
          if (!isCollision(newX, newY)) {
            group.translation.set(newX, newY);
          }
          break;
        }
        case "TURN_RIGHT":
          group.rotation += Math.PI / 2; // Rotate right by 90 degrees
          break;
        case "TURN_LEFT":
          group.rotation -= Math.PI / 2; // Rotate left by 90 degrees
          break;
        default:
          break;
      }

      twoRef.current.update(); // Re-render the scene
    }
  }, [actions]);

  return (
    <div
      ref={gameRef}
      style={{
        width: `${CANVAS_SIZE.width}px`,
        height: `${CANVAS_SIZE.height}px`,
        backgroundColor: "#f0f0f0",
      }}
    />
  );
};

export default TwoGame;
