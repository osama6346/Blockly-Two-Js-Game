import React, { useEffect, useRef } from "react";
import Two from "two.js";

const TwoGame = ({ actions }) => {
  const gameRef = useRef(null);
  const twoRef = useRef(null);
  const robotGroupRef = useRef(null);

  const CANVAS_SIZE = { width: 500, height: 500 }; // Size of the game canvas
  const ROBOT_SIZE = { width: 80, height: 120 }; // Size of the robot

  const isCollision = (x, y) => {
    // Check if the robot is outside the canvas bounds
    const halfWidth = ROBOT_SIZE.width / 2;
    const halfHeight = ROBOT_SIZE.height / 2;

    return (
      x - halfWidth < 0 || // Left boundary
      x + halfWidth > CANVAS_SIZE.width || // Right boundary
      y - halfHeight < 0 || // Top boundary
      y + halfHeight > CANVAS_SIZE.height // Bottom boundary
    );
  };

  useEffect(() => {
    if (gameRef.current && !twoRef.current) {
      const params = { width: CANVAS_SIZE.width, height: CANVAS_SIZE.height };
      const two = new Two(params).appendTo(gameRef.current);
      twoRef.current = two;

      if (!robotGroupRef.current) {
        const group = two.makeGroup();

        const body = two.makeRectangle(0, 0, ROBOT_SIZE.width, ROBOT_SIZE.height);
        body.fill = "#808080";
        body.stroke = "black";
        body.linewidth = 3;

        const head = two.makeRectangle(0, -70, 60, 40);
        head.fill = "#A9A9A9";
        head.stroke = "black";
        head.linewidth = 2;

        const leftEye = two.makeCircle(-10, -75, 5);
        leftEye.fill = "white";
        leftEye.stroke = "black";

        const rightEye = two.makeCircle(10, -75, 5);
        rightEye.fill = "white";
        rightEye.stroke = "black";

        const leftArm = two.makeRectangle(-50, 0, 10, 60);
        leftArm.fill = "#A9A9A9";
        leftArm.stroke = "black";

        const rightArm = two.makeRectangle(50, 0, 10, 60);
        rightArm.fill = "#A9A9A9";
        rightArm.stroke = "black";

        group.add(body, head, leftEye, rightEye, leftArm, rightArm);
        group.translation.set(250, 250); 
        robotGroupRef.current = group;
      }

      two.update();
    }

    return () => {
      if (twoRef.current) {
        twoRef.current.clear();
        twoRef.current = null;
        robotGroupRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (actions.length > 0 && twoRef.current && robotGroupRef.current) {
      const group = robotGroupRef.current;

      const action = actions[actions.length - 1]; 
      switch (action) {
        case "MOVE_FORWARD": {
          const angle = group.rotation; 
          const dx = Math.cos(angle) * 20; 
          const dy = Math.sin(angle) * 20; 

          const newX = group.translation.x + dx;
          const newY = group.translation.y + dy;

          if (!isCollision(newX, newY)) {
            group.translation.set(newX, newY);
          }
          break;
        }
        case "TURN_RIGHT":
          group.rotation += Math.PI / 4; 
          break;
        case "TURN_LEFT":
          group.rotation -= Math.PI / 4; 
          break;
        default:
          break;
      }

      twoRef.current.update(); 
    }
  }, [actions]);

  return (
    <div
      ref={gameRef}
      style={{
        border: "1px solid black",
        width: `${CANVAS_SIZE.width}px`,
        height: `${CANVAS_SIZE.height}px`,
        backgroundColor: "#f0f0f0",
      }}
    />
  );
};

export default TwoGame;
